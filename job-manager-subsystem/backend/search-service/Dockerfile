FROM node:18-alpine

WORKDIR /app

# Copy common module
COPY backend/common /app/backend/common

# Copy service package.json
COPY backend/search-service/package*.json /app/backend/search-service/

WORKDIR /app/backend/search-service

# Install dependencies
RUN npm install

# Copy service code
COPY backend/search-service /app/backend/search-service

EXPOSE 3000

CMD ["npm", "start"]
