# Schiphol Assignment

[![Live Site](https://img.shields.io/badge/Live%20Site-Online-brightgreen)](https://fly.appcore.nl)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

## Quick Start

1. **Clone & Install**
```bash
git clone <repository-url>
cd schiphol-assignment
npm install
```

2. **Setup Git Hooks**
```bash
npm run setup-hooks
```

3. **Launch Development Server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see your application running!

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests |
| `npm run e2e` | Run end-to-end tests |
| `npm run lint` | Run linter |
| `npm run format` | Format code |

## Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **React Router** - Framework
- **TailwindCSS** - Styling
- **Vitest** - Unit Testing
- **Playwright** - E2E Testing
- **Biome** - Linting & Formatting

## Git Hooks

This project uses Lefthook for Git hooks. The following hooks are configured:

- **pre-commit**: Runs Biome check and format on staged files
- **pre-push**: Runs Biome check, unit tests, and E2E tests

## Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t schiphol-assignment .

# Run the container
docker run -p 3000:3000 schiphol-assignment
```