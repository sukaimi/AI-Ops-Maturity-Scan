import { Request, Response } from 'express';
import { prisma } from '../db';

interface FollowupRequest {
  leadId: string;
}

export async function generateFollowupDraft(req: Request, res: Response) {
  try {
    const { leadId } = req.body as FollowupRequest;
    
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const answers = JSON.parse(lead.answers);
    
    // Identify main bottleneck
    const mainBottleneck = identifyMainBottleneck(answers);
    
    // Generate personalized draft
    const draft = generateEmailDraft(lead, mainBottleneck, lead.automationGapPercent);

    res.json({ draft });
  } catch (error) {
    console.error('Error generating follow-up draft:', error);
    res.status(500).json({ error: 'Failed to generate follow-up draft' });
  }
}

function identifyMainBottleneck(answers: Record<string, number>): string {
  // Find the most critical gap
  if (answers['workflow_bottlenecks'] >= 4) {
    return 'manual workflow delays';
  } else if (answers['team_resources'] >= 4) {
    return 'excessive manual work';
  } else if (answers['lead_management'] <= 2) {
    return 'inefficient lead routing';
  } else if (answers['reporting_automation'] <= 2) {
    return 'manual reporting overhead';
  } else {
    return 'operational inefficiencies';
  }
}

function generateEmailDraft(lead: any, bottleneck: string, gapPercent: number): string {
  return `Subject: Your AI Ops Uplift Plan — Next Step?

Hi ${lead.fullName.split(' ')[0]},

Last week, you ran our AI Ops Maturity Scan and identified a ${Math.round(gapPercent)}% automation gap.

Based on your responses, the biggest bottleneck is ${bottleneck}.

Here's what we can fix in the next 30 days:

1. Automate the top manual task consuming 20+ hours/week
2. Build AI workflows that deliver measurable ROI
3. Deliver a working solution (not just a deck)

Our proven track record:
✓ Eliminated 40+ hrs/week of manual ops in < 30 days
✓ Built AI pipelines producing 2–5× ROI in 1 quarter
✓ We deliver builds, not decks

Would you like to schedule a 15-minute call to outline your specific automation roadmap?

Reply "YES" and I'll send over 3 time slots.

Best,
Code&Canvas Team`;
}

