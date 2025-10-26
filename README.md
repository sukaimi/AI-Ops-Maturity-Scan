# AI Ops Maturity Scan™ - Code&Canvas

A full-stack lead generation application that assesses AI readiness and generates personalized automation uplift plans.

🔗 **Repository**: [https://github.com/sukaimi/AI-Ops-Maturity-Scan](https://github.com/sukaimi/AI-Ops-Maturity-Scan)

## 🎯 Overview

This application:
- Conducts an 18-question AI readiness assessment
- Calculates AI Readiness Score, Automation Gap, and ROI Potential
- Generates personalized AI Ops Uplift Plan™ reports
- Captures qualified leads with business email validation
- Exports Board-Ready PDF reports
- Provides admin dashboard for lead management and prioritization

## ✨ Features

- 📊 **18-Question Assessment** - Comprehensive automation and readiness audit
- 🎯 **Smart Scoring** - AI Readiness Score, Automation Gap, ROI Potential, Deal Priority
- 📄 **Personalized Reports** - Executive Summary, Performance Gaps, Fast Wins, 90-Day Roadmap
- 📧 **Lead Qualification** - Business email validation, deal priority scoring
- 📥 **PDF Export** - Board-ready reports for executive presentations
- 👥 **Admin Dashboard** - View leads sorted by deal priority
- 📅 **Booking System** - AI Ops Sprint call booking with prep questions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Database Setup

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### Run Development Servers

```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Admin Dashboard: http://localhost:3000/admin
- Bookings View: http://localhost:3000/admin/bookings

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling (futuristic glassmorphic design)
- **Zustand** - State management
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **SQLite** - Database (dev), upgradeable to Supabase/Postgres
- **PDFKit** - PDF generation

## 📁 Project Structure

```
AI-Ops-Maturity-Scan/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── pages/        # Landing, Quiz, EmailGate, Report, Admin, Bookings
│   │   ├── store/        # Zustand state management
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Express backend
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── data/         # Question definitions
│   │   ├── db.ts
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
├── README.md
├── SETUP.md
└── package.json
```

## 📊 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/score` | POST | Calculate readiness scores |
| `/api/report` | POST | Generate report sections |
| `/api/lead` | POST | Save qualified lead |
| `/api/lead/:leadId` | GET | Get full lead details |
| `/api/pdf/:leadId` | GET | Export PDF report |
| `/api/booking` | POST | Save booking request |
| `/api/bookings` | GET | Get all bookings |
| `/api/dashboard` | GET | Get all leads sorted by priority |
| `/api/followup-draft` | POST | Generate follow-up email draft |

## 🧮 Scoring Model

- **AI Readiness Score**: `(WeightedAvg / 5) × 100`
- **Automation Gap**: `100 − AI Readiness Score`
- **ROI Potential**: Based on bottleneck costs and gap size
- **Deal Priority**: `0.5 × decision_power + 0.3 × timeline + 0.2 × cost_of_pain`

## 🎨 UI/UX

- Futuristic glassmorphic design
- Dark theme with neon cyan & magenta accents
- Animated grid background
- Progress bars with gradient animations
- Mobile-first responsive design
- Smooth transitions and hover effects

## 📈 Success Metrics

Track:
- Qualified lead rate > 50%
- Email opt-in > 35%
- Booking conversion > 20%
- Lead prioritization by deal_priority

## 🗄️ Database Schema

### Lead Model
- Basic lead information (name, email)
- Scores (readiness, gap, ROI, priority)
- Answers to all 18 questions
- Full report sections (JSON)

### Booking Model
- Linked to Lead via foreign key
- Booking request details
- Prep questions answered

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[QUICK_START.md](QUICK_START.md)** - Quick start guide
- **[BOOKING_FLOW.md](BOOKING_FLOW.md)** - Booking system documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

## 🔧 Environment

- **Development**: SQLite database
- **Production**: Upgrade to Supabase/Postgres
- **Ports**: Frontend 3000, Backend 5001

## 🤝 Contributing

This is a Code&Canvas internal tool. For questions or contributions, contact the development team.

## 📝 License

Proprietary - Code&Canvas

## 🎯 Branding

**Tagline**: "We design and deploy AI-driven workflows that pay for themselves."

**Proof Points**:
- ✓ Eliminated 40+ hrs/week of manual ops in < 30 days
- ✓ Built AI pipelines producing 2–5× ROI in 1 quarter
- ✓ We deliver builds, not decks

---

**Built with ❤️ for Code&Canvas**
