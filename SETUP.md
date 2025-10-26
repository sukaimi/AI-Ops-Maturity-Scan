# Setup Instructions

## Quick Start

1. **Install all dependencies:**
```bash
npm install:all
```

Or manually:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

2. **Set up the database:**
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

3. **Run the development servers:**
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000

## Manual Setup

If the workspace command doesn't work, you can run each service manually:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## First Run

1. Navigate to http://localhost:3000
2. Click "START THE SCAN"
3. Answer 18 questions
4. Enter business email (any @company.com format works)
5. View your personalized AI Ops Uplift Plan™
6. Export PDF or book a call

## Admin Dashboard

Navigate to http://localhost:3000/admin to see all qualified leads sorted by deal priority.

## Production Build

```bash
npm run build
```

This will create optimized builds in `frontend/dist` and `backend/dist`.

