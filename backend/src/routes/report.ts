import { Request, Response } from 'express';
import { generateReportSections } from '../services/reportGenerator';

interface ReportRequest {
  answers: Record<string, number>;
  scores: {
    aiReadinessScore: number;
    automationGapPercent: number;
    roiPotentialPercent: number;
    dealPriority: number;
  };
}

export function generateReport(req: Request, res: Response) {
  try {
    const { answers, scores } = req.body as ReportRequest;
    
    if (!answers || !scores) {
      return res.status(400).json({ error: 'Missing answers or scores' });
    }

    const report = generateReportSections(answers, scores);
    
    res.json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
}

