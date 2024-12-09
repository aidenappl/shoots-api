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
    # Check required environment variables
    if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_DB" ] || [ -z "$POSTGRES_HOST" ] || [ -z "$POSTGRES_PORT" ]; then
        echo "Error: Missing required environment variables. Please check your .env file."
        echo "Required variables: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT"
        exit 1
    fi

    # Wait for PostgreSQL to be ready
    echo "Waiting for PostgreSQL to be ready..."
    while ! pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER > /dev/null 2>&1; do
        sleep 1
    done

    # Create database if it doesn't exist
    echo "Ensuring database exists..."
    PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d postgres -c "CREATE DATABASE $POSTGRES_DB;" 2>/dev/null || true

    # Run all migration files in order
    echo "Running migrations in development mode..."
    for migration in migrations/*.sql; do
        echo "Running migration: $migration"
        PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB -f "$migration"
    done
fi

echo "Migrations completed!" 