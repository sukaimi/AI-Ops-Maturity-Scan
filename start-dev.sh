#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting AI Ops Maturity Scan...${NC}"
echo ""

# Kill any existing processes on ports 3000 and 5001
echo "Checking ports 3000 and 5001..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null
sleep 1

# Start backend
echo -e "${YELLOW}Starting backend server on port 5001...${NC}"
cd "$(dirname "$0")/backend"
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${YELLOW}Starting frontend server on port 3000...${NC}"
cd ../frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Development servers are running!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "📱 ${BLUE}Frontend:${NC} http://localhost:3000"
echo -e "🔧 ${BLUE}Backend:${NC}  http://localhost:5001"
echo -e "👥 ${BLUE}Admin:${NC}    http://localhost:3000/admin"
echo ""
echo -e "${YELLOW}Logs:${NC}"
echo "  Backend:  tail -f /tmp/backend.log"
echo "  Frontend: tail -f /tmp/frontend.log"
echo ""
echo -e "${YELLOW}To stop the servers:${NC} kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo -e "${BLUE}Press Ctrl+C to view logs or close this terminal${NC}"
echo ""

# Keep script running
tail -f /tmp/backend.log /tmp/frontend.log

