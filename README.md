# Expo-Convex Todo App with Bun

A simple Todo application built with Expo and Convex, powered by Bun.

## Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Getting Started

1. Clone this repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
# Start both Expo and Convex servers
bun run dev

# Or start them separately
bun run start      # Expo server
bun run convex:dev # Convex server
```

## Features

- Real-time Todo list with Convex backend
- Add, toggle, and delete tasks
- Automatic data synchronization

## Tech Stack

- [Expo](https://expo.dev/) - React Native development platform
- [Convex](https://convex.dev/) - Backend with automatic real-time updates
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- [React Native](https://reactnative.dev/) - Mobile application framework
- [TypeScript](https://www.typescriptlang.org/) - Static typing for JavaScript

## Deployment

### Convex Backend

To deploy the Convex backend:

1. Create a Convex account at [convex.dev](https://convex.dev)
2. Login to Convex:

```bash
bun run convex login
```

3. Deploy your Convex functions:

```bash
bun run convex deploy
```

### Expo App

To deploy the Expo app, you can use EAS Build:

```bash
bun add -d eas-cli
bun run eas build --platform all
```

## Project Structure

- `App.tsx` - Main application component
- `convex/` - Convex backend functions and schema
  - `schema.ts` - Database schema
  - `tasks.ts` - Task related functions (queries and mutations)
  - `ConvexClientProvider.tsx` - React provider for Convex client

## License

MIT

```sh
npx create-expo --example with-typescript
```

TypeScript is a superset of JavaScript which gives you static types and powerful tooling in Visual Studio Code including autocompletion and useful inline warnings for type errors.

## 🚀 How to use

#### Creating a new project

- Create a project: `npx create-expo --example with-typescript`
- `cd` into the project

### Adding TypeScript to existing projects

- Create a blank TypeScript config: `touch tsconfig.json`
- Run `yarn start` or `npm run start` to automatically configure TypeScript
- Rename files to TypeScript, `.tsx` for React components and `.ts` for plain typescript files

> 💡 You can disable the TypeScript setup in Expo CLI with the environment variable `EXPO_NO_TYPESCRIPT_SETUP=1 expo start`

## 📝 Notes

- [Expo TypeScript guide](https://docs.expo.dev/versions/latest/guides/typescript/)
