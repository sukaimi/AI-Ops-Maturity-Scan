# 🚀 Quick Start Guide

## Start the Servers

Open **two separate terminal windows** and run:

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:5001
```

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.4.21  ready in 273 ms
➜  Local:   http://localhost:3000/
```

## Access the Application

Once both servers are running:

- **Landing Page**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## Troubleshooting

### Port 5001 in use?
```bash
lsof -ti:5001 | xargs kill -9
```

### Port 3000 in use?
```bash
lsof -ti:3000 | xargs kill -9
```

### Can't connect?
1. Check both servers are running in separate terminals
2. Make sure you see startup messages in both terminals
3. Try refreshing http://localhost:3000
4. Check browser console for errors

## What to Test

1. Go to http://localhost:3000
2. Click "START THE SCAN"
3. Answer all 18 questions
4. Enter name and business email (e.g., name@company.com)
5. View your personalized AI Ops Uplift Plan™
6. Export PDF or book a call
7. Check admin dashboard at http://localhost:3000/admin

