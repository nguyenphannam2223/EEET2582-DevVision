FROM node:18-alpine

WORKDIR /app

# Copy common module
COPY backend/common /app/backend/common

# Copy service package.json
COPY backend/auth-service/package*.json /app/backend/auth-service/

WORKDIR /app/backend/auth-service

# Install dependencies (will link to local common)
RUN npm install

# Copy service code
COPY backend/auth-service /app/backend/auth-service

EXPOSE 3000

CMD ["npm", "start"]
