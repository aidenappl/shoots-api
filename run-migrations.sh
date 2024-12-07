#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Check if we're in production mode
if [ "$NODE_ENV" = "production" ]; then
    if [ -z "$DATABASE_URL" ]; then
        echo "Error: DATABASE_URL environment variable is required in production mode"
        exit 1
    fi
    
    echo "Running migrations in production mode..."
    
    # Extract database name from DATABASE_URL
    DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
    
    # Create database if it doesn't exist (ignoring error if it does)
    echo "Ensuring database exists..."
    psql "$DATABASE_URL" -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || true
    
    # Run migrations
    for migration in migrations/*.sql; do
        echo "Running migration: $migration"
        psql "$DATABASE_URL" -f "$migration"
    done
else
    # Local development settings
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_NAME=shoots_db
    DB_HOST=localhost
    DB_PORT=5432

    # Wait for PostgreSQL to be ready
    echo "Waiting for PostgreSQL to be ready..."
    while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER > /dev/null 2>&1; do
        sleep 1
    done

    # Create database if it doesn't exist
    echo "Ensuring database exists..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || true

    # Run all migration files in order
    echo "Running migrations in development mode..."
    for migration in migrations/*.sql; do
        echo "Running migration: $migration"
        PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$migration"
    done
fi

echo "Migrations completed!" 