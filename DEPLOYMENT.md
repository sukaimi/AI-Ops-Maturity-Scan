# Vercel Deployment Guide for AI Ops Maturity Scan

## 📋 Deployment Strategy

This is a full-stack application with:
- **Frontend**: React + Vite (port 3000)
- **Backend**: Express + TypeScript API (port 5001)

For Vercel deployment, you have **two options**:

## 🎯 Option 1: Recommended - Separate Deployments

Deploy frontend and backend as separate Vercel projects.

### Frontend Deployment (Recommended)

**Framework Preset**: `Vite`

1. **Go to Vercel Dashboard**
2. **Import Git Repository**: `https://github.com/sukaimisukri/AI-Ops-Maturity-Scan`
3. **Configure Project**:
   - Root Directory: `frontend`
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend.vercel.app`

### Backend Deployment

**Framework Preset**: `Other`

1. **Create new Vercel project** for backend
2. **Configure**:
   - Root Directory: `backend`
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install && npx prisma generate`
3. **Environment Variables**:
   - `DATABASE_URL`: Your Supabase/Postgres URL
   - `PORT`: `5001` (optional, Vercel assigns)

### Database Setup

**Option A**: Use Supabase (Recommended)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string
4. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Run migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## 🎯 Option 2: Monorepo with Serverless Functions

Deploy everything in one project with Vercel's serverless functions.

### Setup

1. **Framework Preset**: `Other`
2. **Root Directory**: `/` (project root)
3. **Build Command**: Custom (see below)

### Build Configuration

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist"
}
```

### API Routes Setup

Rename backend files for Vercel serverless:
- `backend/src/routes/*` → `api/*.ts`

## 🚀 Quick Deploy Steps

### Step 1: Update Frontend API URL

Edit `frontend/vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
})
```

### Step 2: Deploy Frontend

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

3. Follow prompts:
   - Select `frontend` as root
   - Framework: Vite
   - Build command: `npm run build`

### Step 3: Deploy Backend

For backend, convert to serverless functions or use a separate deployment.

**Note**: Express apps work better on Railway, Render, or Heroku for full control.

## 🔧 Environment Variables

Set these in Vercel dashboard (Settings → Environment Variables):

### Frontend
- `VITE_API_URL` - Your backend URL

### Backend
- `DATABASE_URL` - Database connection string
- `PORT` - Server port (optional)

## 📊 Recommended Architecture

```
┌─────────────────┐
│   Vercel        │  → Frontend (React + Vite)
│   https://...   │
└─────────────────┘
        ↓ API calls
┌─────────────────┐
│   Railway/      │  → Backend (Express API)
│   Render        │
│   https://...   │
└─────────────────┘
        ↓
┌─────────────────┐
│   Supabase      │  → Database (Postgres)
│   (or Neon)     │
└────────────────┘
```

## 🚨 Important Notes

1. **Database**: SQLite won't work in serverless. Use Supabase/Neon Postgres
2. **Prisma**: Run migrations before deploy:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
3. **PDF Generation**: PDFKit may need additional setup in serverless
4. **File Storage**: Consider external storage for uploads

## 🔗 Alternative: Railway/Render

For simpler backend deployment:

**Railway**:
1. Connect GitHub repo
2. Select `backend` folder
3. Add `DATABASE_URL` env var
4. Deploy

**Render**:
1. Create Web Service
2. Connect GitHub repo
3. Set root directory: `backend`
4. Build command: `npm install && npx prisma generate && npm run build`
5. Start command: `npm start`

## 📝 Production Checklist

- [ ] Update database to Postgres
- [ ] Set environment variables
- [ ] Configure CORS for production domain
- [ ] Update API URLs in frontend
- [ ] Test PDF generation
- [ ] Test booking system
- [ ] Test admin dashboard
- [ ] Set up monitoring/logs
- [ ] Configure custom domain

## 🛠️ Quick Commands

```bash
# Deploy frontend to Vercel
cd frontend
vercel --prod

# Deploy backend to Railway
cd backend
railway up

# Run migrations
cd backend
npx prisma migrate deploy
```

