# Vercel Deployment Setup Guide

## 🎯 Quick Answer to Your Questions

### Where to Set These in Vercel Dashboard

## 1️⃣ Deploy Frontend First

### Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repo: `sukaimi/AI-Ops-Maturity-Scan`

### Configuration Settings (During Import)

When importing, you'll see these fields:

#### **Framework Preset**
Select: **`Vite`**

#### **Root Directory** 
Type: **`frontend`**
(This tells Vercel to deploy only the frontend folder)

#### **Build Command**
Type: **`npm run build`**
(This runs the build script from `frontend/package.json`)

#### **Output Directory**
Type: **`dist`**
(This is where Vite outputs the built files)

#### **Install Command**
Type: **`npm install`**
(Vercel will install dependencies automatically)

### After Deploy - Go to Settings

1. Click **Settings** tab
2. Click **Environment Variables**

### Frontend Environment Variables

Click **"Add New"** and add:

```
Name: VITE_API_URL
Value: https://your-backend.railway.app (or your backend URL)
Environment: Production, Preview, Development
```

---

## 2️⃣ Backend Setup (Use Railway or Render)

Vercel is optimized for frontend/serverless. For your Express backend, use:

### Option A: Railway (Recommended - 3 clicks)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Click **"Deploy from GitHub repo"**
5. Select your repo: `AI-Ops-Maturity-Scan`
6. Railway auto-detects the backend folder

### Railway Configuration

**Service Settings:**
- **Root Directory**: `backend`
- **Build Command**: `npm install && npx prisma generate`
- **Start Command**: `npm run dev` (or `npm start`)

**Environment Variables (Add these):**
```
DATABASE_URL=your_postgres_connection_string
```

### Option B: Render (Alternative)

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select your repo
4. Configure:
   - **Name**: `ai-ops-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`

---

## 3️⃣ Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com)
2. Create account → **New Project**
3. Wait for database to provision
4. Go to **Settings** → **Database**
5. Copy the **Connection String**
6. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

Add to Railway/Render:
```
DATABASE_URL=<your_supabase_connection_string>
```

### Update Database Schema

Edit `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Run migrations:
```bash
cd backend
npx prisma migrate deploy
```

---

## 📋 Complete Setup Checklist

### Frontend (Vercel)
- [ ] Import repo
- [ ] Set Root Directory: `frontend`
- [ ] Set Framework: `Vite`
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`
- [ ] Add Environment Variable: `VITE_API_URL`

### Backend (Railway/Render)
- [ ] Deploy backend service
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install && npx prisma generate`
- [ ] Set Start Command: `npm start` (or `npm run dev`)
- [ ] Add Environment Variable: `DATABASE_URL`
- [ ] Run migrations: `npx prisma migrate deploy`

### Database (Supabase)
- [ ] Create Supabase project
- [ ] Copy connection string
- [ ] Update Prisma schema to `postgresql`
- [ ] Run migrations

---

## 🔄 After First Deploy

### Update Frontend API URL

In your Vercel dashboard, edit the environment variable:

```
VITE_API_URL=https://ai-ops-backend.up.railway.app
```

(Replace with your actual backend URL from Railway)

### Test Your Deployment

1. Visit your Vercel frontend URL
2. Try the AI Ops Scan
3. Check backend logs in Railway/Render
4. Verify data saves in Supabase

---

## 🎨 Visual Guide to Vercel Settings

### During Import:
```
┌─────────────────────────────────┐
│ Import Project                  │
│ ────────────────────────────── │
│ Framework Preset: [Vite     ▼] │  ← Select this
│ Root Directory:  [frontend  ]  │  ← Type this
│ Build Command:   [npm run build]│  ← Type this
│ Output Directory: [dist      ]  │  ← Type this
│                                 │
│ [Deploy]                        │
└─────────────────────────────────┘
```

### After Import - Settings:
```
┌─────────────────────────────────┐
│ Settings → Environment Variables│
│ ────────────────────────────── │
│ + Add New                       │  ← Click this
│                                 │
│ Name:     [VITE_API_URL      ] │
│ Value:     [your-backend-url  ] │
│ Environment: [☑️ Production    ] │
│             [☑️ Preview       ] │
│             [☑️ Development   ] │
└─────────────────────────────────┘
```

---

## 🚨 Common Issues

### Issue 1: "Cannot find module"
**Fix**: Make sure Root Directory is set to `frontend` or `backend`

### Issue 2: "Build failed"
**Fix**: Check Build Command matches your package.json scripts

### Issue 3: API calls failing
**Fix**: Check environment variable `VITE_API_URL` is set correctly

### Issue 4: Database connection error
**Fix**: Ensure `DATABASE_URL` is set in backend environment

---

## 📞 Need Help?

If you get stuck:
1. Check build logs in Vercel dashboard
2. Check server logs in Railway/Render dashboard
3. Verify environment variables are set
4. Make sure database migrations ran successfully

