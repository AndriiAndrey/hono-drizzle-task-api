# Hono Drizzle Task API

A lightweight and type-safe REST API built with **Hono** and **Drizzle ORM**, using **PostgreSQL** as the database.  
The project focuses on simplicity, strong typing, and schema validation using **Zod**, with support for Docker-based local development.


## Features

- Fast HTTP server using Hono
- Type-safe database access with Drizzle ORM
- Schema validation with Zod
- PostgreSQL as primary database
- Docker Compose for local development
- Testing with Vitest
- OpenAPI-ready structure


## Tech Stack

- **Hono** — minimal and fast js web framework  
- **Drizzle ORM** — type-safe SQL ORM  
- **PostgreSQL** — relational database  
- **Zod** — runtime validation and type inference  
- **Docker Compose** — containerized development environment  
- **TypeScript** — strongly typed codebase  


## Installation

```bash
pnpm install
```

##  Environment Variables

- Create a **.env** file in the project root, use **.env.example** as a reference
- For tests environment, create **.env.test**, you likely need separate database for tests

## Running the Application

- Development mode - runs the app with hot reload:

```bash
pnpm run dev
```

- Production build
```bash
pnpm run build
pnpm run start
```

- Run with Docker compose (dev-database)

Start docker
```bash
pnpm run docker:dev:up
```
Down docker
```bash
pnpm run docker:dev:down
```

## Testing

Runs tests using vitest with ***.env.test.***
```bash
pnpm run test
```

## Linting

Check linting:
```bash
pnpm run lint
```

Fix linting issues:
```bash
pnpm run lint:fix
```

## OpenAPI / Swagger (optional)

The project is compatible with OpenAPI generation using @hono/zod-openapi.
API reference UI can be exposed via @scalar/hono-api-reference.

- openapi doc available locally from `/openapi` endpoint
- scalar UI for visualization can be opened on `/scalar` endpoint 
