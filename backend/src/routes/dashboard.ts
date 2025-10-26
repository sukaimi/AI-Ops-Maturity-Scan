import { Request, Response } from 'express';
import { prisma } from '../db';

export async function getDashboard(_req: Request, res: Response) {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: [
        { dealPriority: 'desc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        fullName: true,
        email: true,
        aiReadinessScore: true,
        automationGapPercent: true,
        roiPotentialPercent: true,
        dealPriority: true,
        decisionPower: true,
        timeline: true,
        costOfPain: true,
        createdAt: true
      }
    });

    // Calculate summary stats
    const stats = {
      totalLeads: leads.length,
      avgReadinessScore: leads.reduce((sum, l) => sum + l.aiReadinessScore, 0) / leads.length,
      avgDealPriority: leads.reduce((sum, l) => sum + l.dealPriority, 0) / leads.length,
      highPriorityLeads: leads.filter(l => l.dealPriority >= 70).length
    };

    res.json({ leads, stats });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}

