import { Request, Response } from 'express';
import { prisma } from '../db';

interface LeadRequest {
  fullName: string;
  email: string;
  answers: Record<string, number>;
  scores: {
    aiReadinessScore: number;
    automationGapPercent: number;
    roiPotentialPercent: number;
    dealPriority: number;
    decisionPower: number;
    timeline: number;
    costOfPain: number;
  };
  reportSnippet?: string;
  reportSections?: any;
}

export async function saveLead(req: Request, res: Response) {
  try {
    const { fullName, email, answers, scores, reportSnippet, reportSections } = req.body as LeadRequest;
    
    // Validate email format (basic business email check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Check if it's a business email (basic check)
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain || freeDomains.includes(domain)) {
      return res.status(400).json({ error: 'Please use a business email address' });
    }

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        fullName,
        email,
        aiReadinessScore: scores.aiReadinessScore,
        automationGapPercent: scores.automationGapPercent,
        roiPotentialPercent: scores.roiPotentialPercent,
        dealPriority: scores.dealPriority,
        decisionPower: scores.decisionPower,
        timeline: scores.timeline,
        costOfPain: scores.costOfPain,
        answers: JSON.stringify(answers),
        reportSnippet: reportSnippet || '',
        reportSections: reportSections ? JSON.stringify(reportSections) : null
      }
    });

    res.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Lead saved successfully' 
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ error: 'Failed to save lead' });
  }
}

