# Legal Mate Application Deployment Guide

Welcome to the Legal Mate application deployment guide. This document outlines the steps required to containerize and deploy the Legal Mate application using Docker, Docker Compose, and Heroku for easy one-click deployment.

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Docker Compose
- Heroku CLI
- Git (for version control)

## Local Development and Testing

### Backend Dockerization

Refer to the `backend/Dockerfile` for backend containerization details.

### Frontend Dockerization

Refer to the `frontend/Dockerfile` for frontend containerization details.

### Docker Compose

Use the `docker-compose.yml` to run the entire application stack locally. Run the following command to start all services:

```
docker-compose up
```

## Deployment to Heroku

### Initial Setup

1. Install the Heroku CLI and log in.
2. Create a new Heroku app with `heroku create`.

### Container Registry

1. Log in to the Heroku Container Registry with `heroku container:login`.
2. Push the Docker containers to Heroku with `heroku container:push web --app <app-name>`.
3. Release the containers with `heroku container:release web --app <app-name>`.

### Environment Variables and Add-ons

1. Set up required environment variables using the Heroku CLI or dashboard.
2. Add necessary add-ons, such as Heroku Postgres, via the CLI or dashboard.

### Post-Deployment

1. Access the Heroku app's URL to verify the deployment.
2. Monitor application logs with `heroku logs --tail --app <app-name>`.

## Documentation

For detailed deployment instructions, refer to `DEPLOYMENT.md`.

## Testing

Ensure to test the Docker setup locally and the Heroku deployment to catch any issues early.

Thank you for using the Legal Mate application. Follow these steps to ensure a smooth deployment process.