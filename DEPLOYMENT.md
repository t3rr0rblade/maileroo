# Deployment Guide

This guide covers deploying the Maileroo monorepo to various platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- Google AI API key

### Local Development
```bash
# Clone and setup
git clone https://github.com/yourusername/maileroo.git
cd maileroo
npm run install:all

# Set environment variables
cd frontend
echo "GOOGLE_API_KEY=your_key_here" > .env.local

# Setup database
cd ../backend
npm run migrate

# Start development servers
cd ..
npm run dev
```

## 🌐 Production Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel)
1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Deploy frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**
   - `GOOGLE_API_KEY`: Your Google AI API key

#### Backend (Railway)
1. **Connect to Railway**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Deploy backend**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Set environment variables in Railway dashboard**
   - `NODE_ENV`: production
   - `PORT`: 3001

### Option 2: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run migrate

EXPOSE 3001

CMD ["npm", "start"]
```

#### Create Dockerfile for Frontend
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    volumes:
      - ./backend/dev.sqlite3:/app/dev.sqlite3
```

### Option 3: Heroku

#### Frontend (Heroku)
1. **Create Heroku app**
   ```bash
   heroku create maileroo-frontend
   ```

2. **Deploy frontend**
   ```bash
   cd frontend
   git subtree push --prefix frontend heroku main
   ```

3. **Set environment variables**
   ```bash
   heroku config:set GOOGLE_API_KEY=your_key_here
   ```

#### Backend (Heroku)
1. **Create Heroku app**
   ```bash
   heroku create maileroo-backend
   ```

2. **Deploy backend**
   ```bash
   cd backend
   git subtree push --prefix backend heroku main
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   ```

## 🔧 Environment Variables

### Frontend
```bash
GOOGLE_API_KEY=your_google_ai_api_key_here
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### Backend
```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=your_database_url_here
```

## 📊 Monitoring

### Health Checks
- Frontend: `GET /api/health`
- Backend: `GET /health`

### Logs
```bash
# Vercel
vercel logs

# Railway
railway logs

# Heroku
heroku logs --tail
```

## 🔒 Security

### API Key Management
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Use different keys for development and production

### Database Security
- Use connection pooling in production
- Enable SSL for database connections
- Regular backups
- Monitor for suspicious activity

## 🚀 Performance Optimization

### Frontend
- Enable Next.js image optimization
- Use CDN for static assets
- Implement caching strategies
- Optimize bundle size

### Backend
- Enable compression
- Implement rate limiting
- Use connection pooling
- Cache frequently accessed data

## 📈 Scaling

### Horizontal Scaling
- Use load balancers
- Implement session management
- Use shared databases
- Consider microservices architecture

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Use caching layers
- Implement CDN

## 🔄 CI/CD Pipeline

The project includes GitHub Actions for:
- Automated testing
- Code quality checks
- Build verification
- Deployment automation

See `.github/workflows/ci.yml` for details.
