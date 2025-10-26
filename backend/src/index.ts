import express, { Request, Response } from 'express';
import cors from 'cors';
import { scoreAnswers } from './routes/score';
import { generateReport } from './routes/report';
import { saveLead } from './routes/lead';
import { generatePDF } from './routes/pdf';
import { generateFollowupDraft } from './routes/followup-draft';
import { getDashboard } from './routes/dashboard';
import { saveBooking } from './routes/booking';
import { getAllBookings } from './routes/bookings';
import { getLeadDetail } from './routes/lead-detail';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/score', scoreAnswers);
app.post('/api/report', generateReport);
app.post('/api/lead', saveLead);
app.get('/api/pdf/:leadId', generatePDF);
app.post('/api/followup-draft', generateFollowupDraft);
app.get('/api/dashboard', getDashboard);
app.post('/api/booking', saveBooking);
app.get('/api/bookings', getAllBookings);
app.get('/api/lead/:leadId', getLeadDetail);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

