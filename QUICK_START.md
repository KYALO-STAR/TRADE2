# Quick Start Checklist ✅

Copy and paste these commands to get started quickly:

## Option 1: Simple Development Setup (5 minutes)

```bash
# 1. Navigate to project folder
cd your-project-folder

# 2. Install dependencies
npm install

# 3. Create environment file
echo "DERIV_APP_ID=1089
DERIV_API_URL=wss://ws.binaryws.com/websockets/v3
NEXTAUTH_SECRET=your-random-secret-change-this
NEXTAUTH_URL=http://localhost:3000" > .env.local

# 4. Start development server
npm run dev
```

**✅ Done!** Open http://localhost:3000

## Option 2: Full Docker Setup (10 minutes)

```bash
# 1. Navigate to project folder
cd your-project-folder

# 2. Copy environment template
cp .env.production.example .env.production

# 3. Edit .env.production with your values (important!)
# Set database passwords and API keys

# 4. Start with Docker
docker-compose up -d

# 5. View logs
docker-compose logs -f app
```

**✅ Done!** Open http://localhost:3000

## What You Need Installed

- [ ] **Node.js 18+** → https://nodejs.org
- [ ] **Docker** (for Option 2) → https://docker.com

## Minimum Environment Variables

```env
DERIV_APP_ID=1089
NEXTAUTH_SECRET=change-this-to-random-string
```

That's it! 🚀