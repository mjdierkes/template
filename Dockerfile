FROM node:20-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install bun for package management
RUN npm install -g bun@latest expo-cli

# Copy package files
COPY package.json ./
COPY bun.lock ./

# Install dependencies 
RUN bun install

# Update specific packages to required versions
RUN bun add expo@~53.0.7 expo-constants@~17.1.5 expo-font@~13.3.1 expo-router@~5.0.5 expo-splash-screen@~0.30.8 expo-system-ui@~5.0.7 react-native@0.79.2 react-native-safe-area-context@5.4.0

# Copy the rest of the app
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=19000
ENV EXPO_USE_METRO=1

# Expose the Expo ports
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

# Create an entrypoint script
RUN echo "#!/bin/sh\necho 'Container is running...'\ntail -f /dev/null" > /entrypoint.sh && chmod +x /entrypoint.sh

# Use a simple entrypoint that keeps the container running
ENTRYPOINT ["/entrypoint.sh"]
# To start Expo app: bdun expo start --web 