# TaskFlow - Task Management Platform

A modern, full-stack task management application built with Next.js, TypeScript, and PostgreSQL. Includes user authentication, board management, task organization, and collaborative features.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [How to Use](#how-to-use)
- [Available Scripts](#available-scripts)
- [Development Commands](#development-commands)

## Overview

TaskFlow is a full-featured task management platform that enables users to organize their work through boards, lists, and tasks. It features a modern UI with drag-and-drop functionality, secure user authentication, and a comprehensive dashboard for task tracking and management.

## Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [dnd-kit](https://docs.dndkit.com/) - Lightweight drag-and-drop library

**Backend:**
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Serverless API endpoints
- [Node.js](https://nodejs.org/)

**Database:**
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM

**Authentication:**
- [JWT (Jose)](https://github.com/panva/jose) - JSON Web Tokens
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing

**Validation & Forms:**
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [TanStack React Form](https://tanstack.com/form/latest) - Headless form management

**Development & Quality:**
- [Biome](https://biomejs.dev/) - Linter and formatter
- [tsx](https://tsx.is/) - TypeScript executor
- [Docker](https://www.docker.com/) - Database containerization

## Features

- **User Authentication** - Secure sign up, login, and session management
- **Dashboard** - Personalized user dashboard with task overview
- **Boards** - Create and manage project boards
- **Task Management** - Create, edit, and organize tasks
- **Task Lists** - Organize tasks into categorized lists
- **Drag and Drop** - Intuitive drag-and-drop interface for task organization
- **Comments** - Add comments to tasks for collaboration
- **Tags** - Tag and categorize tasks
- **User Management** - Profile management and account settings
- **Responsive Design** - Mobile-friendly UI
- **Type Safety** - Full TypeScript coverage


## Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/Kat-exe8345/ipmp-assignment-1-sw>
cd my-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory
Use the .env.example file as a starting point (or rename it and add the variables)

### 4. Start PostgreSQL Database

```bash
# Create and start the PostgreSQL Docker container
pnpm run db:create

# Or if the container already exists, just start it
pnpm run db:start
```

### 5. Set Up the Database

Generate and run migrations:

```bash
pnpm run dz:generate
pnpm run dz:migrate
```

### 6. Run the Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication pages (login, signup, logout)
│   ├── (landing)/         # Landing page route group
│   ├── (marketing)/       # Marketing pages (about, features, support)
│   ├── (protected)/       # Protected routes requiring authentication
│   │   ├── board/         # Board management pages
│   │   ├── dashboard/     # User dashboard
│   │   └── test-page/     # Testing page
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   └── test/              # Test page
├── components/            # Reusable React components
│   ├── auth/              # Authentication components
│   ├── boards/            # Board-related components
│   ├── dashboard/         # Dashboard components
│   ├── navigation/        # Navigation and layout components
│   └── tasks/             # Task-related components
├── db/                    # Database configuration and schema
│   ├── index.ts           # Database client
│   ├── relations/         # Drizzle ORM relations
│   └── schema/            # Database schema definitions
├── features/              # Feature-specific business logic
│   ├── auth/              # Authentication service, guards, validators
│   ├── boards/            # Board feature logic
│   ├── tasks/             # Task feature logic
│   └── users/             # User management logic
├── lib/                   # Utility functions and helpers
│   └── utils/             # Shared utilities
└── server/                # Server-side utilities
    └── auth/              # Authentication helpers (JWT, passwords)
```

## Database Setup

### Schema Overview

The application uses the following main entities:

- **users** - User accounts and authentication
- **sessions** - User session management
- **boards** - Project/board containers
- **lists** - Task lists within boards
- **tasks** - Individual tasks
- **comments** - Task comments
- **tags** - Task tags for categorization

### Database Commands

```bash
# Generate migrations from schema changes
pnpm run dz:generate

# Run pending migrations
pnpm run dz:migrate

# Open Drizzle Studio GUI
pnpm run dz:studio

# Create PostgreSQL Docker container
pnpm run db:create

# Start existing container
pnpm run db:start

# Stop container
pnpm run db:stop

# Restart container
pnpm run db:restart

# View container logs
pnpm run db:logs

# List all containers
pnpm run db:ps
```

## API Routes

### Authentication

- POST /api/auth/signup - Create new user account
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout

## How to Use

### Authentication Flow

1. Visit [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up" to create a new account or "Log In" to access an existing account
3. Fill in your credentials and submit the form
4. You'll be redirected to your dashboard upon successful authentication

### Managing Tasks

1. Navigate to the **Dashboard** to view your tasks
2. Click on a **Board** to view tasks organized by lists
3. Create new tasks using the task creation interface
4. Use drag-and-drop to reorganize tasks between lists
5. Add comments and tags to tasks for better organization

## Available Scripts

### Development & Building

```bash
# Start development server (with hot reload)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start
```

### Code Quality

```bash
# Run linter checks
pnpm run lint

# Format code with Biome
pnpm run format
```

### Database Management

```bash
# Generate new migrations
pnpm run dz:generate

# Run migrations
pnpm run dz:migrate

# Open Drizzle Studio (GUI for database)
pnpm run dz:studio

# Create PostgreSQL container
pnpm run db:create

# Start PostgreSQL
pnpm run db:start

# Stop PostgreSQL
pnpm run db:stop

# Restart PostgreSQL
pnpm run db:restart

# View database logs
pnpm run db:logs

# List running containers
pnpm run db:ps
```

## Development Commands

### First Time Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create and start database
pnpm run db:create

# 3. Run migrations
pnpm run dz:generate
pnpm run dz:migrate

# 4. Start development server
pnpm run dev
```

### Regular Development Workflow

```bash
# Format code before committing
pnpm run format

# Check for linting issues
pnpm run lint

# Start dev server
pnpm run dev
```

### Database Development

Use Drizzle Studio for visual database management:

```bash
pnpm run dz:studio
```

This opens a web interface where you can view and manage your database.

## Deployment

To deploy this application:

1. Build the production bundle:
   ```bash
   pnpm run build
   ```

2. Deploy to your hosting platform (Vercel, AWS, DigitalOcean, etc.)

3. Set the required environment variables in your production environment

4. Ensure PostgreSQL database is accessible from your production environment

For detailed deployment instructions, refer to [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL container is running: pnpm run db:ps
- Check DATABASE_URL in .env.local
- View container logs: pnpm run db:logs

### Port Already in Use

- Next.js default port is 3000
- To use a different port: pnpm run dev -- -p 3001

### Migration Issues

- Clear and regenerate migrations: pnpm run dz:generate
- Verify schema files in src/db/schema/

## Contributing

When contributing to this project:

1. Format code: pnpm run format
2. Check linting: pnpm run lint
3. Test thoroughly before committing
4. Follow the existing code structure and patterns

## License

This project is private. For licensing information, contact the project owner.
