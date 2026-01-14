FROM node:18-alpine

WORKDIR /app

# Copy common module
COPY backend/common /app/backend/common

# Copy service package.json
COPY backend/job-service/package*.json /app/backend/job-service/

WORKDIR /app/backend/job-service

# Install dependencies
RUN npm install

# Copy service code
COPY backend/job-service /app/backend/job-service

EXPOSE 3000

CMD ["npm", "start"]
