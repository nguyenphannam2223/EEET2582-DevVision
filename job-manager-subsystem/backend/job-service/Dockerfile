FROM node:18-alpine

WORKDIR /app

# Copy common module and install its dependencies
COPY backend/common /app/backend/common
WORKDIR /app/backend/common
RUN npm install

# Return to root and copy service
WORKDIR /app
COPY backend/job-service/package*.json /app/backend/job-service/
WORKDIR /app/backend/job-service
RUN npm install

COPY backend/job-service /app/backend/job-service

EXPOSE 3000

CMD ["npm", "start"]
