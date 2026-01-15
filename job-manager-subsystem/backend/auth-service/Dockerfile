FROM node:18-alpine

WORKDIR /app

# Copy common module and install its dependencies
COPY backend/common /app/backend/common
WORKDIR /app/backend/common
RUN npm install

# Return to root and copy service
WORKDIR /app
COPY backend/auth-service/package*.json /app/backend/auth-service/
WORKDIR /app/backend/auth-service
RUN npm install

COPY backend/auth-service /app/backend/auth-service

EXPOSE 3000

CMD ["npm", "start"]
