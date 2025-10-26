# 🟢 Server Status

## Running Servers

✅ **Backend**: http://localhost:5001
- Status: Running
- Process ID: $(lsof -ti:5001)

✅ **Frontend**: http://localhost:3000
- Status: Running  
- Process ID: $(lsof -ti:3000)

## Quick Commands

### View Server Logs
```bash
# Backend
tail -f /tmp/backend-log.txt

# Frontend
tail -f /tmp/frontend-log.txt
```

### Restart Servers
```bash
# Kill and restart backend
lsof -ti:5001 | xargs kill -9
cd backend && npm run dev

# Kill and restart frontend
lsof -ti:3000 | xargs kill -9  
cd frontend && npm run dev
```

### Test Backend API
```bash
curl http://localhost:5001/api/dashboard
```

### Test Frontend
Open: http://localhost:3000

