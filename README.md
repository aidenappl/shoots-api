# Shoots API

Shoots API is a Node.js and Express-based backend application designed to provide an API with PostgreSQL integration. This guide outlines the steps to set up and run the project.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [PostgreSQL](https://www.postgresql.org/) (version 13 or later)

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

Create a .env file in the project root and add the following variables:

```env
PORT=3000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database_name>
```

Replace "\<username>", "\<password>", and "\<database_name>" with your PostgreSQL credentials.

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

- Ensure PostgreSQL is running before starting the server.
- Update the database schema and credentials as required in your .env file.

### Linting and Code Formatting

- The project uses ESLint with Prettier integration for code style enforcement.
- Run npm run lint to check your code.
