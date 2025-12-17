# Development Environment Setup

## Introduction

A well-configured development environment is the foundation of productive software development. The right tools, properly configured, accelerate development, catch errors early, and make your workflow smooth. This lesson covers setting up a professional development environment for full-stack web development.

## Learning Objectives

- Set up Node.js and package management
- Configure TypeScript for full-stack development
- Install and configure VS Code with essential extensions
- Set up Git and version control workflow
- Configure linting, formatting, and pre-commit hooks
- Organize project structure effectively
- Set up environment variables securely

## Core Tools Installation

### Node.js and npm

```bash
# Install Node.js (LTS version recommended)
# Download from nodejs.org or use version manager

# Using nvm (Node Version Manager) - recommended
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts

# Verify installation
node --version  # Should show v18.x.x or v20.x.x
npm --version   # Should show 9.x.x or 10.x.x

# Alternative: pnpm (faster package manager)
npm install -g pnpm
```

### Git

```bash
# Install Git
# macOS: brew install git
# Ubuntu: sudo apt-get install git
# Windows: Download from git-scm.com

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.cm commit
```

## Project Initialization

### Create Next.js Project

```bash
# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest my-capstone --typescript --tailwind --app --src-dir

cd my-capstone

# Project structure created:
# my-capstone/
# ├── src/
# │   ├── app/
# │   │   ├── layout.tsx
# │   │   └── page.tsx
# │   └── components/
# ├── public/
# ├── package.json
# ├── tsconfig.json
# ├── tailwind.config.ts
# └── next.config.js
```

### Initialize Git

```bash
# Initialize repository (if not already done by create-next-app)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/username/my-capstone.git
git branch -M main
git push -u origin main
```

## VS Code Configuration

### Essential Extensions

Install these extensions:

```
# Must-Have
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- TypeScript Language Features (built-in)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Prisma (Prisma.prisma)

# Highly Recommended
- GitLens (eamodio.gitlens)
- Error Lens (usernamehw.errorlens)
- Auto Rename Tag (formulahendry.auto-rename-tag)
- Path Intellisense (christian-kohler.path-intellisense)
- Thunder Client (rangav.vscode-thunder-client) # API testing
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\(([^)]*)\)", "["'`]([^"'`]*).*?["'`]"],
    ["cn\(([^)]*)\)", ""([^"]*)""]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## TypeScript Configuration

### Strict TypeScript Config

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Linting and Formatting

### ESLint Configuration

`.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Prettier Configuration

`.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

`.prettierignore`:

```
node_modules
.next
out
build
dist
```

## Git Hooks with Husky

```bash
# Install Husky and lint-staged
npm install -D husky lint-staged

# Initialize Husky
npx husky init

# Create pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

`package.json` addition:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

## Environment Variables

### Setup

`.env.local` (never commit):

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret-here"

# Email
SENDGRID_API_KEY="your-api-key"

# External APIs
WEATHER_API_KEY="your-weather-api-key"
```

`.env.example` (commit as template):

```bash
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Email
SENDGRID_API_KEY=

# External APIs
WEATHER_API_KEY=
```

### Type-Safe Environment Variables

`src/env.ts`:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  SENDGRID_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

## Project Structure

```
my-capstone/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Route groups
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/               # API routes
│   │   │   └── activities/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── forms/            # Form components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utilities
│   │   ├── db.ts            # Database client
│   │   ├── auth.ts          # Auth config
│   │   └── utils.ts         # Helper functions
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── env.ts               # Environment validation
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── tests/                   # Test files
├── .env.local              # Environment variables (gitignored)
├── .env.example            # Environment template
├── .eslintrc.json          # ESLint config
├── .prettierrc             # Prettier config
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Database Setup with Prisma

```bash
# Install Prisma
npm install prisma @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env with DATABASE_URL
```

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password_hash String
  name          String
  created_at    DateTime  @default(now())
  updated_at    DateTime  @updatedAt
  
  activities    Activity[]
}

model Activity {
  id            String   @id @default(uuid())
  user_id       String
  category      String
  activity_type String
  quantity      Float
  unit          String
  carbon_kg     Float
  activity_date DateTime @default(now())
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  user          User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  @@index([user_id])
  @@index([activity_date])
}
```

```bash
# Create and run migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Package Scripts

`package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "prepare": "husky install"
  }
}
```

## Development Workflow

### Daily Workflow

```bash
# 1. Pull latest changes
git pull

# 2. Install any new dependencies
npm install

# 3. Run database migrations
npx prisma migrate dev

# 4. Start development server
npm run dev

# 5. Make changes, commit often
git add .
git commit -m "Add feature X"

# 6. Push to remote
git push
```

### Creating New Features

```bash
# 1. Create feature branch
git checkout -b feature/user-authentication

# 2. Make changes
# 3. Test locally
# 4. Commit changes

git add .
git commit -m "Implement user authentication"

# 5. Push and create pull request
git push -u origin feature/user-authentication
```

## Debugging Setup

### VS Code Launch Configuration

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

## Common Issues and Solutions

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript Errors After Update

```bash
# Regenerate types
npx prisma generate

# Restart TS server in VS Code
# Cmd+Shift+P -> TypeScript: Restart TS Server
```

## Checklist

### Initial Setup
- [ ] Node.js installed (LTS version)
- [ ] Git installed and configured
- [ ] VS Code installed with extensions
- [ ] Next.js project created
- [ ] TypeScript configured
- [ ] ESLint and Prettier configured
- [ ] Husky and lint-staged set up
- [ ] Environment variables configured
- [ ] Prisma initialized
- [ ] Git repository created and pushed

### Daily Verification
- [ ] Development server runs (`npm run dev`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Database accessible (`npx prisma studio`)
- [ ] Git status clean or changes committed

## Summary

A proper development environment includes:
- Node.js and package management
- VS Code with essential extensions
- TypeScript with strict configuration
- Linting and formatting automation
- Git hooks for code quality
- Environment variable management
- Database tooling (Prisma)
- Organized project structure

Invest time in setup—it pays off throughout development. A well-configured environment catches errors early, enforces code quality, and makes development enjoyable.

## Additional Resources

- Next.js Documentation: nextjs.org/docs
- TypeScript Handbook: typescriptlang.org/docs
- Prisma Documentation: prisma.io/docs
- VS Code Documentation: code.visualstudio.com/docs
