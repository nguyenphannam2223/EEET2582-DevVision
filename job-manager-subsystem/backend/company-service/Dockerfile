FROM node:18-alpine

WORKDIR /app

# Copy common module and install its dependencies
COPY backend/common /app/backend/common
WORKDIR /app/backend/common
RUN npm install

# Return to root and copy service
WORKDIR /app
COPY backend/company-service/package*.json /app/backend/company-service/
WORKDIR /app/backend/company-service
RUN npm install
RUN mkdir -p uploads

COPY backend/company-service /app/backend/company-service

EXPOSE 3000

CMD ["npm", "start"]
