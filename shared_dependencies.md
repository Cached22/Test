Shared Dependencies:

- **Base Images**: `node:latest`, `nginx:alpine`
- **Working Directory**: `/usr/src/app`
- **Package Files**: `package.json`, `package-lock.json`
- **Ports**: `5000` (backend), `80` (frontend)
- **Build Commands**: `npm install`, `npm run build`
- **Start Commands**: `node server.js` (backend), `nginx -g "daemon off;"` (frontend)
- **Service Names**: `backend`, `frontend`, `db` (if applicable)
- **Environment Variables**: (specific to the application, not named here)
- **Heroku Commands**: `heroku create`, `heroku container:login`, `heroku container:push`, `heroku container:release`, `heroku logs`
- **Heroku App Name**: `<app-name>` (placeholder for actual app name)
- **Documentation Files**: `README.md`, `DEPLOYMENT.md`
- **Docker Compose Key Terms**: `services`, `build`, `context`, `dockerfile`, `ports`, `environment`, `depends_on`
- **File Paths**: `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`