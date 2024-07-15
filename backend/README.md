# Gallery Home - Frontend

This project represents the backend part of Gallery Home.

## Available Scripts

In the project directory, you can run:

### `npm start`

This script running the app on port `3001` and need credentials for the root user because creating resource directory, where storing the images files.

### `npm run db:generate-migration`

The script generate migration for the db based on the [schema.prisma](./prisma/schema.prisma).

### `npm run linter:fix`

Run this script before every commit to apply configured code rules for syntaxes using eslint and prettier.

### IMPORTANT !!!

To start the application locally, you need to set `DATABASE_URL` env, as it is:

```bash
export DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
```
