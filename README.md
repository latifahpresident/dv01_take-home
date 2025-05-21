# DV01 Take-Home Project notes

React script version caused a few compatibility issues which prompted me to rip it out and use v

## Prerequisites

- Node.js >= 18.18.0
- Yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:latifahpresident/dv01_take-home.git
cd dv01_take-home
```

2. Install dependencies:

```bash
yarn install
```

if you run into installaation issues try

```bash
yarn install --ignore-engines
```

3. Start the development server:

```bash
yarn dev
```

The should automatically open to `http://localhost:3000`

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn preview` - Preview the production build locally
- `yarn storybook` - Start Storybook development server
- `yarn build-storybook` - Build Storybook for production

## Project Structure

```
src/
├── components/     # Reusable UI components
├── services/      # API and data services
├── utils/         # Utility functions
└── assets/        # Static assets and styles
```

## Features

- Interactive data visualization using Recharts
- Multi-select filtering capabilities
- Responsive design
- Component documentation with Storybook

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Recharts
- Storybook
- ESLint & Prettier
- Husky for git hooks

## Development

The project uses several development tools:

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Storybook for component documentation
