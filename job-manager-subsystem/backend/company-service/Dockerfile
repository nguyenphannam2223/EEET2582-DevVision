FROM node:18-alpine

WORKDIR /app

# Copy common module
COPY backend/common /app/backend/common

# Copy service package.json
COPY backend/company-service/package*.json /app/backend/company-service/

WORKDIR /app/backend/company-service

# Install dependencies
RUN npm install

# Create uploads directory
RUN mkdir -p uploads

# Copy service code
COPY backend/company-service /app/backend/company-service

EXPOSE 3000

CMD ["npm", "start"]
