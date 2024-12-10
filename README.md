# Shoots API

Shoots API is a Node.js and Express-based backend application designed to provide an API with PostgreSQL integration. This guide outlines the steps to set up and run the project.

UI Companion: [https://github.com/cdugo/shoots-ui/](https://github.com/cdugo/shoots-ui/)

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [PostgreSQL](https://www.postgresql.org/) (version 13 or later)
- Docker and Docker Compose
- PostgreSQL client tools (`psql`, `pg_isready`)

---

## **Setup Instructions**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shoots-api
```

### 2. Install Dependencies

Run the following command to install required packages:

```bash
npm install &&
npm install -g ts-node
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
# Application
PORT=3000
NODE_ENV=development

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=shoots_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Only needed for production
DATABASE_URL=
```

## Local Database Setup

1. Start the PostgreSQL database container:

```bash
docker compose up -d
```

2. Run database migrations:

```bash
./run-migrations.sh
```

### Database Configuration
The application automatically handles both development and production environments:

- **Development** (default):
  - Host: localhost
  - Port: 5432
  - Database: shoots_db
  - Username: postgres
  - Password: postgres

- **Production**:
  - Set `NODE_ENV=production` and provide the `DATABASE_URL` in `.env`

### Running Migrations

The migration script automatically detects your environment and runs accordingly:

- **For Local Development:**

```bash
./run-migrations.sh
```

- **For Production (Render):**
  1. In your Render dashboard, set the required environment variables:
     - `NODE_ENV=production`
     - `DATABASE_URL` (automatically set by Render for PostgreSQL services)
  
  2. Then in the Render shell or deploy script:
  ```bash
  ./run-migrations.sh
  ```
  The script will automatically use the environment variables from Render.

## Available Scripts

### Start the Server

```bash
npm start
```

The server will start on http://localhost:3000 by default.

### Lint the Code

```bash
npm run lint
```

Runs ESLint to check for coding style and potential issues.

### Test (Placeholder)

```bash
npm test
```

This is a placeholder script. Customize it for your tests.

## Development Notes

### Database

- For local development, use the Docker container setup
- For production, ensure the `DATABASE_URL` is set in your environment
- Run migrations after database setup using `./run-migrations.sh`
- When deploying to production, migrations will automatically use Render's environment variables

### Linting and Code Formatting

- The project uses ESLint with Prettier integration for code style enforcement.
- Run npm run lint to check your code.
