FROM node:20-slim

WORKDIR /app

# Install bun for package management
RUN npm install -g bun@latest expo-cli

# Copy package files
COPY package.json bun.lock ./

# Install dependencies 
RUN bun install

# Update specific packages to required versions
RUN bun add expo@~53.0.7 expo-constants@~17.1.5 expo-font@~13.3.1 expo-router@~5.0.5 expo-splash-screen@~0.30.8 expo-system-ui@~5.0.7 react-native@0.79.2 react-native-safe-area-context@5.4.0

# Copy the rest of the app
COPY . .

# Expose the Expo port
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

# Set the command to start the Expo app
CMD ["bun", "expo", "start", "--web"] 