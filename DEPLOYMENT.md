# Legal Mate Application Deployment Guide

## Prerequisites

- Docker installed on your local machine.
- Docker Compose installed on your local machine.
- Heroku CLI installed and logged in on your local machine.
- An account on Heroku.

## Dockerization

### Backend Dockerization

1. Navigate to the `backend` directory.
2. Create a `Dockerfile` with the following content:

```
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Frontend Dockerization

1. Navigate to the `frontend` directory.
2. Create a `Dockerfile` with the following content:

```
# Build stage
FROM node:latest as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Docker Compose Setup

1. In the root directory of the project, create a `docker-compose.yml` file with the following content:

```
version: '3.8'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
  db:
    image: postgres
    environment:
      - POSTGRES_DB=legalmate
      - POSTGRES_USER=legalmate
      - POSTGRES_PASSWORD=securepassword
```

## Heroku Deployment

### Prepare for Heroku

- Install the Heroku CLI and log in using `heroku login`.

### Deploy to Heroku

1. Create a new app on Heroku:

```
heroku create <app-name>
```

2. Log in to the Heroku Container Registry:

```
heroku container:login
```

3. Push the Docker containers to Heroku:

```
heroku container:push web --app <app-name>
```

4. Release the containers:

```
heroku container:release web --app <app-name>
```

5. Set up required environment variables on Heroku:

```
heroku config:set NODE_ENV=production --app <app-name>
```

6. Add necessary add-ons, like Heroku Postgres:

```
heroku addons:create heroku-postgresql:hobby-dev --app <app-name>
```

### Post-Deployment

- Verify the deployment by accessing the Heroku app's URL.
- Monitor the application logs:

```
heroku logs --tail --app <app-name>
```

## Testing

- Test the Docker setup locally by running:

```
docker-compose up
```

- Test the Heroku deployment by visiting the provided URL after deployment.