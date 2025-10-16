# 🚀 Trading Platform - Local Setup Guide

This guide will help you set up and run the Advanced Trading Platform on your local machine.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control) - [Download here](https://git-scm.com/)

### Optional (for full features)
- **Docker** and **Docker Compose** - [Download here](https://docs.docker.com/get-docker/)
- **PostgreSQL** (if not using Docker) - [Download here](https://www.postgresql.org/download/)

## 🛠️ Quick Start (Development Mode)

### Step 1: Extract and Navigate
```bash
# Extract the zip file to your desired location
# Open terminal/command prompt and navigate to the project folder
cd path/to/trading-app-folder
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install

# Or if you prefer yarn
yarn install
```

### Step 3: Environment Setup
```bash
# Copy the environment template
cp .env.production.example .env.local

# Edit .env.local with your preferred text editor
# Minimum required: DERIV_APP_ID (use 1089 for testing)
```

**Quick .env.local setup for testing:**
```env
DERIV_APP_ID=1089
DERIV_API_URL=wss://ws.binaryws.com/websockets/v3
NEXTAUTH_SECRET=your-secret-key-here-change-this
NEXTAUTH_URL=http://localhost:3000
```

### Step 4: Run Development Server
```bash
npm run dev
```

🎉 **Your app should now be running at: http://localhost:3000**

## 🔧 Environment Variables Explained

Edit your `.env.local` file with these values:

| Variable | Description | Default/Example |
|----------|-------------|-----------------|
| `DERIV_APP_ID` | Your Deriv API app ID | `1089` (testing) |
| `DERIV_API_URL` | WebSocket URL for Deriv API | `wss://ws.binaryws.com/websockets/v3` |
| `NEXTAUTH_SECRET` | Secret for authentication | Generate a random string |
| `NEXTAUTH_URL` | Your app URL | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string | Only needed for full features |

## 🐳 Full Setup with Docker (Recommended for Production-like Environment)

If you want to run the complete setup with database:

### Step 1: Install Docker
Make sure Docker and Docker Compose are installed on your system.

### Step 2: Environment Setup
```bash
# Copy and edit the production environment file
cp .env.production.example .env.production

# Edit the database passwords and URLs in .env.production
```

### Step 3: Start with Docker
```bash
# Start all services (app + database + redis)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

The app will be available at: http://localhost:3000

## 📁 Project Structure

```
trading-app/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript definitions
├── public/              # Static files
├── docker-compose.yml   # Docker configuration
├── Dockerfile          # Docker build instructions
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies and scripts
```

## 🚨 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:** Make sure you ran `npm install` completely:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use
**Solution:** Use a different port:
```bash
npm run dev -- -p 3001
# App will run on http://localhost:3001
```

### Issue: Environment variables not working
**Solution:** 
1. Ensure `.env.local` exists in the project root
2. Restart the development server after editing environment variables
3. Variables starting with `NEXT_PUBLIC_` are client-side, others are server-side only

### Issue: Database connection errors
**Solution:** 
- For development: The app works without a database for basic features
- For full features: Use Docker setup or install PostgreSQL locally

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server (after build) |
| `npm run lint` | Check code style |
| `npm run type-check` | Check TypeScript types |

## 🔑 Getting Deriv API Credentials

1. Visit [Deriv API Documentation](https://developers.deriv.com/)
2. Create a free account
3. Register your application to get an App ID
4. Use App ID `1089` for testing/development

## 🌟 Key Features Available

- **Trading Dashboard** - Real-time market data and trading interface
- **Bot Management** - Upload and manage trading bots
- **Course System** - Educational modules with progress tracking
- **User Profile** - Account management and settings
- **AI Assistant** - Trading guidance and support
- **Media Uploads** - Course materials and bot strategies

## 📞 Need Help?

- Check the browser console (F12) for any error messages
- Ensure all prerequisites are installed correctly
- Verify environment variables are set properly
- Make sure no other applications are using port 3000

## 📝 Notes

- The application is built with Next.js 14 and React 18
- Uses TypeScript for type safety
- Styled with Tailwind CSS
- Database is optional for basic functionality
- Production deployment ready with Docker

---

**Happy Trading! 📈**