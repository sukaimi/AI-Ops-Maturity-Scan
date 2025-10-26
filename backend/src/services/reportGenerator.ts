import { questions } from '../data/questions';

interface Scores {
  aiReadinessScore: number;
  automationGapPercent: number;
  roiPotentialPercent: number;
  dealPriority: number;
}

export function generateReportSections(answers: Record<string, number>, scores: Scores) {
  // Identify key gaps
  const gaps = identifyGaps(answers);
  
  // Generate fast wins
  const fastWins = generateFastWins(answers, gaps);
  
  // Generate roadmap
  const roadmap = generateRoadmap(scores.automationGapPercent);
  
  // Calculate ROI
  const roiData = calculateROI(scores, answers);

  return {
    executiveSummary: generateExecutiveSummary(scores),
    performanceGaps: gaps,
    fastWins,
    roadmap90Days: roadmap,
    roiSection: roiData
  };
}

function generateExecutiveSummary(scores: Scores): string {
  const readiness = scores.aiReadinessScore;
  const gap = scores.automationGapPercent;
  
  if (readiness >= 80) {
    return `Your team shows strong AI readiness (${Math.round(readiness)}%). Focus on optimizing existing workflows and exploring advanced AI capabilities.`;
  } else if (readiness >= 60) {
    return `You're on the path to automation maturity (${Math.round(readiness)}% readiness). Key opportunities exist in ${Math.round(gap)}% of operations. Quick wins can deliver 2-3x ROI within 90 days.`;
  } else if (readiness >= 40) {
    return `Significant automation gaps identified (${Math.round(readiness)}% readiness, ${Math.round(gap)}% gap). By addressing critical bottlenecks, you can eliminate 40+ hours/week of manual work and achieve 3-5x ROI.`;
  } else {
    return `High-impact automation opportunities detected (${Math.round(gap)}% gap). Your operations can achieve rapid transformation with strategic AI workflow deployment, potentially delivering 5× ROI within one quarter.`;
  }
}

function identifyGaps(answers: Record<string, number>): Array<{ area: string; severity: string; impact: string }> {
  const gaps: Array<{ area: string; severity: string; impact: string }> = [];
  
  // Analyze answers to identify gaps
  if (answers['automation_level'] <= 2) {
    gaps.push({
      area: 'Low Automation Coverage',
      severity: 'High',
      impact: '40+ hours/week spent on manual repetitive tasks'
    });
  }
  
  if (answers['workflow_bottlenecks'] >= 3) {
    gaps.push({
      area: 'Manual Process Bottlenecks',
      severity: 'High',
      impact: 'Daily delays in critical workflows'
    });
  }
  
  if (answers['team_resources'] >= 3) {
    gaps.push({
      area: 'Excessive Manual Effort',
      severity: 'High',
      impact: `${Math.round((answers['team_resources'] / 5) * 40)}+ hours/week on manual tasks`
    });
  }
  
  if (answers['data_integration'] <= 2) {
    gaps.push({
      area: 'Data Silos',
      severity: 'Medium',
      impact: 'Inefficient cross-department coordination'
    });
  }
  
  if (answers['tool_sprawl'] >= 3) {
    gaps.push({
      area: 'Tool Sprawl',
      severity: 'Medium',
      impact: 'High context switching overhead'
    });
  }
  
  if (answers['reporting_automation'] <= 2) {
    gaps.push({
      area: 'Manual Reporting',
      severity: 'Medium',
      impact: 'Hours lost to report compilation weekly'
    });
  }
  
  return gaps;
}

function generateFastWins(answers: Record<string, number>, gaps: any[]): Array<{ title: string; impact: string; timeline: string; roi: string }> {
  const fastWins: Array<{ title: string; impact: string; timeline: string; roi: string }> = [];
  
  // Priority-based fast wins
  if (answers['workflow_bottlenecks'] >= 3) {
    fastWins.push({
      title: 'Eliminate Critical Workflow Bottlenecks',
      impact: 'Instant process acceleration, 50-70% faster execution',
      timeline: 'Week 1-2',
      roi: '3-5x within 30 days'
    });
  }
  
  if (answers['lead_management'] <= 3) {
    fastWins.push({
      title: 'AI-Powered Lead Qualification & Routing',
      impact: '2x conversion rates, zero manual triage',
      timeline: 'Week 2-3',
      roi: '5-10x within 60 days'
    });
  }
  
  if (answers['reporting_automation'] <= 2) {
    fastWins.push({
      title: 'Automated Reporting Dashboard',
      impact: 'Eliminate 10+ hours/week of manual reporting',
      timeline: 'Week 1',
      roi: 'Clear time savings worth $5-20K/month'
    });
  }
  
  if (answers['communication_automation'] <= 2) {
    fastWins.push({
      title: 'Intelligent Communication Automation',
      impact: '90% reduction in manual outreach, 2-3x response rates',
      timeline: 'Week 2-3',
      roi: '2-3x within 45 days'
    });
  }
  
  if (answers['crm_integration'] <= 2) {
    fastWins.push({
      title: 'Seamless CRM-Workflow Integration',
      impact: 'Zero manual data entry, real-time sync',
      timeline: 'Week 1-2',
      roi: '2-4x within 30 days'
    });
  }
  
  return fastWins;
}

function generateRoadmap(gapPercent: number): Array<{ phase: string; focus: string; timeline: string; deliverables: string }> {
  return [
    {
      phase: 'Phase 1: Quick Wins',
      focus: 'Eliminate manual bottlenecks, automate high-impact workflows',
      timeline: 'Days 1-30',
      deliverables: '2-3 AI workflows deployed, 40+ hours/week saved, first ROI proofs'
    },
    {
      phase: 'Phase 2: Integration',
      focus: 'Connect data sources, build unified workflows',
      timeline: 'Days 31-60',
      deliverables: 'Fully integrated stack, automated reporting, 3x operational efficiency'
    },
    {
      phase: 'Phase 3: Optimization',
      focus: 'Advanced AI features, predictive analytics, scale',
      timeline: 'Days 61-90',
      deliverables: '5x ROI achieved, automated growth engine, sustainable scaling'
    }
  ];
}

function calculateROI(scores: Scores, answers: Record<string, number>): { potential: number; timeline: string; components: string[] } {
  const monthlyCost = answers['cost_of_pain'] === 5 ? 100000 :
                     answers['cost_of_pain'] === 3 ? 35000 :
                     answers['cost_of_pain'] === 2 ? 10000 : 2500;
  
  const potentialSavings = monthlyCost * (scores.automationGapPercent / 100) * 0.75; // 75% capture rate
  const investment = monthlyCost * 0.3; // 30% of pain cost
  const annualROI = ((potentialSavings * 12 - investment) / investment) * 100;
  
  return {
    potential: Math.round(annualROI),
    timeline: '90 days to proof, 12 months to full ROI',
    components: [
      `Eliminate ${Math.round(potentialSavings / 1000)}K/month in inefficiencies`,
      `Invest ${Math.round(investment / 1000)}K once`,
      `Save ${Math.round((potentialSavings * 12) / 1000)}K annually`
    ]
  };
}

