FROM node:18-alpine

WORKDIR /app

# Copy common module and install its dependencies
COPY backend/common /app/backend/common
WORKDIR /app/backend/common
RUN npm install

# Return to root and copy service
WORKDIR /app
COPY backend/search-service/package*.json /app/backend/search-service/
WORKDIR /app/backend/search-service
RUN npm install

COPY backend/search-service /app/backend/search-service

EXPOSE 3000

CMD ["npm", "start"]
