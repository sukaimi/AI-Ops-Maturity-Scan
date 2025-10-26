import { Request, Response } from 'express';
import { questions } from '../data/questions';

interface ScoreRequest {
  answers: Record<string, number>;
}

export function scoreAnswers(req: Request, res: Response) {
  try {
    const { answers } = req.body as ScoreRequest;
    
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Invalid answers format' });
    }

    // Calculate weighted average
    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const [questionId, answerValue] of Object.entries(answers)) {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        const weight = question.weight;
        totalWeightedScore += answerValue * weight;
        totalWeight += weight;
      }
    }

    const weightedAvg = totalWeightedScore / totalWeight;
    
    // Calculate metrics
    const aiReadinessScore = (weightedAvg / 5) * 100;
    const automationGapPercent = 100 - aiReadinessScore;
    
    // Calculate ROI potential (simplified formula)
    const roiPotentialPercent = Math.min(
      Math.max(automationGapPercent * 2 + weightedAvg * 10, 0),
      300
    );

    // Get qualifying answer values
    const decisionPower = answers['decision_power'] || 1;
    const timeline = answers['timeline'] || 1;
    const costOfPain = answers['cost_of_pain'] || 1;

    // Calculate deal priority
    const dealPriority = (0.5 * decisionPower + 0.3 * timeline + 0.2 * costOfPain) * 10;

    res.json({
      aiReadinessScore: Math.round(aiReadinessScore),
      automationGapPercent: Math.round(automationGapPercent),
      roiPotentialPercent: Math.round(roiPotentialPercent),
      dealPriority: Math.round(dealPriority),
      decisionPower,
      timeline,
      costOfPain
    });
  } catch (error) {
    console.error('Error scoring answers:', error);
    res.status(500).json({ error: 'Failed to score answers' });
  }
}

