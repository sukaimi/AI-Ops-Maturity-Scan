# Code&Canvas // AI Ops Maturity Scan™

A full-stack lead generation tool that assesses AI readiness and generates personalized automation uplift plans.

## Features

- 🎯 18-question audit covering automation and readiness
- 📊 AI Readiness Score / Automation Gap / ROI Uplift calculations
- 📄 Personalized AI Ops Uplift Plan™ report generation
- 📧 Business email validation and lead qualification
- 📥 Board-ready PDF export
- 👥 Admin dashboard for lead management
- ✉️ Automated follow-up email draft generation

## Tech Stack

**Frontend:**
- React + Vite + TypeScript
- Tailwind CSS (Futuristic/glassmorphic design)
- Zustand for state management
- React Router for navigation

**Backend:**
- Node.js + Express + TypeScript
- SQLite (via Prisma) - upgradable to Supabase/Postgres
- PDF generation with pdfkit

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install:all
```

2. Set up the database:
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

3. Start development servers:
```bash
npm run dev
```

The frontend will run on http://localhost:3000
The backend will run on http://localhost:5000

## Project Structure

```
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── store/    # Zustand state management
│   │   ├── App.tsx
│   │   └── main.tsx
├── backend/           # Express backend
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── services/ # Business logic
│   │   ├── data/     # Question definitions
│   │   └── index.ts
│   └── prisma/       # Database schema
└── README.md
```

## API Routes

- `POST /api/score` - Calculate readiness scores
- `POST /api/report` - Generate personalized report
- `POST /api/lead` - Save qualified lead
- `GET /api/pdf/:leadId` - Export PDF report
- `POST /api/followup-draft` - Generate follow-up email draft
- `GET /api/dashboard` - Get all leads sorted by priority

## User Flow

1. **Landing Page** → Start the scan
2. **Quiz** (18 questions, one per screen with progress)
3. **Email Gate** → Collect name + business email
4. **Report** → Display personalized uplift plan with:
   - AI Readiness Score / Automation Gap / ROI Uplift
   - Executive Summary
   - Performance Gaps
   - Fast Wins
   - 90-Day Roadmap
   - ROI Projection
5. **Actions**:
   - Export Board-Ready PDF
   - Request AI Ops Sprint call
   - Send to inbox

## Scoring Model

- **AI Readiness Score**: (WeightedAvg / 5) × 100
- **Automation Gap**: 100 − AIReadinessScore
- **ROI Potential**: Based on bottleneck costs and gap size
- **Deal Priority**: 0.5 × decision_power + 0.3 × timeline + 0.2 × cost_of_pain

## Admin Dashboard

Access at `/admin` to view:
- All leads sorted by deal priority
- Summary statistics
- Individual lead details
- Qualifying signals (decision power, timeline, cost of pain)

## Branding

**Tagline:** "We design and deploy AI-driven workflows that pay for themselves."

**Proof Bullets:**
- ✓ Eliminated 40+ hrs/week of manual ops in < 30 days
- ✓ Built AI pipelines producing 2–5× ROI in 1 quarter
- ✓ We deliver builds, not decks

## Success Criteria

- Qualified lead rate > 50%
- Email opt-in > 35%
- Booking conversion > 20%
- Lead dashboard active sorting by deal_priority

## License

Proprietary - Code&Canvas

