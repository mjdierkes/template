FROM node:20-slim

WORKDIR /app

# Install bun for package management
RUN npm install -g bun@latest expo-cli

# Copy package files
COPY package.json bun.lock ./

# Install dependencies 
RUN bun install

# Copy the rest of the app
COPY . .

# Expose the Expo port
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

# Set the command to start the Expo app
CMD ["bun", "expo", "start", "--web"] 