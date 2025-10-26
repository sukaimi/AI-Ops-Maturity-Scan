import { Request, Response } from 'express';
import { prisma } from '../db';

export async function getLeadDetail(req: Request, res: Response) {
  try {
    const { leadId } = req.params;
    
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Parse stored data
    const answers = JSON.parse(lead.answers);
    const reportSections = lead.reportSections ? JSON.parse(lead.reportSections) : null;

    res.json({
      id: lead.id,
      fullName: lead.fullName,
      email: lead.email,
      aiReadinessScore: lead.aiReadinessScore,
      automationGapPercent: lead.automationGapPercent,
      roiPotentialPercent: lead.roiPotentialPercent,
      dealPriority: lead.dealPriority,
      decisionPower: lead.decisionPower,
      timeline: lead.timeline,
      costOfPain: lead.costOfPain,
      answers,
      reportSections,
      createdAt: lead.createdAt
    });
  } catch (error) {
    console.error('Error fetching lead detail:', error);
    res.status(500).json({ error: 'Failed to fetch lead detail' });
  }
}

