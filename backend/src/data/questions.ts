export interface Question {
  id: string;
  prompt: string;
  type: 'single' | 'multiple';
  choices: Choice[];
  weight: number;
  category: 'automation' | 'readiness' | 'qualifying';
}

export interface Choice {
  value: number;
  label: string;
}

export const questions: Question[] = [
  // Core automation questions (15)
  {
    id: 'automation_level',
    prompt: 'What percentage of repetitive tasks are currently automated?',
    type: 'single',
    choices: [
      { value: 1, label: '0-20%' },
      { value: 2, label: '20-40%' },
      { value: 3, label: '40-60%' },
      { value: 4, label: '60-80%' },
      { value: 5, label: '80-100%' }
    ],
    weight: 2,
    category: 'automation'
  },
  {
    id: 'data_integration',
    prompt: 'How integrated are your data sources?',
    type: 'single',
    choices: [
      { value: 1, label: 'Siloed across departments' },
      { value: 2, label: 'Partial integration' },
      { value: 3, label: 'Mostly integrated' },
      { value: 4, label: 'Fully integrated' },
      { value: 5, label: 'AI-enhanced integration' }
    ],
    weight: 1.5,
    category: 'automation'
  },
  {
    id: 'ai_tools',
    prompt: 'How many AI/automation tools does your team actively use?',
    type: 'single',
    choices: [
      { value: 1, label: 'None' },
      { value: 2, label: '1-2 tools' },
      { value: 3, label: '3-5 tools' },
      { value: 4, label: '6-10 tools' },
      { value: 5, label: '10+ tools' }
    ],
    weight: 1.5,
    category: 'readiness'
  },
  {
    id: 'workflow_bottlenecks',
    prompt: 'How often do manual bottlenecks delay critical processes?',
    type: 'single',
    choices: [
      { value: 5, label: 'Daily' },
      { value: 4, label: 'Weekly' },
      { value: 3, label: 'Monthly' },
      { value: 2, label: 'Rarely' },
      { value: 1, label: 'Never' }
    ],
    weight: 2,
    category: 'automation'
  },
  {
    id: 'team_resources',
    prompt: 'How much time does your team spend on repetitive manual tasks per week?',
    type: 'single',
    choices: [
      { value: 5, label: '40+ hours' },
      { value: 4, label: '20-40 hours' },
      { value: 3, label: '10-20 hours' },
      { value: 2, label: '5-10 hours' },
      { value: 1, label: '0-5 hours' }
    ],
    weight: 2,
    category: 'automation'
  },
  {
    id: 'crm_integration',
    prompt: 'How well is your CRM integrated with operational workflows?',
    type: 'single',
    choices: [
      { value: 1, label: 'Not integrated' },
      { value: 2, label: 'Basic integration' },
      { value: 3, label: 'Good integration' },
      { value: 4, label: 'Highly integrated' },
      { value: 5, label: 'AI-powered automation' }
    ],
    weight: 1.5,
    category: 'readiness'
  },
  {
    id: 'reporting_automation',
    prompt: 'How automated is your reporting and analytics?',
    type: 'single',
    choices: [
      { value: 1, label: 'Fully manual' },
      { value: 2, label: 'Partially automated' },
      { value: 3, label: 'Mostly automated' },
      { value: 4, label: 'Fully automated' },
      { value: 5, label: 'AI-driven insights' }
    ],
    weight: 1.5,
    category: 'readiness'
  },
  {
    id: 'scalability_readiness',
    prompt: 'How prepared are your processes for rapid scaling?',
    type: 'single',
    choices: [
      { value: 1, label: 'Not prepared' },
      { value: 2, label: 'Barely prepared' },
      { value: 3, label: 'Moderately prepared' },
      { value: 4, label: 'Well prepared' },
      { value: 5, label: 'Highly prepared' }
    ],
    weight: 1.5,
    category: 'readiness'
  },
  {
    id: 'error_handling',
    prompt: 'How well does your system handle errors and exceptions automatically?',
    type: 'single',
    choices: [
      { value: 1, label: 'Requires manual intervention' },
      { value: 2, label: 'Basic error handling' },
      { value: 3, label: 'Good error handling' },
      { value: 4, label: 'Automated recovery' },
      { value: 5, label: 'Predictive error prevention' }
    ],
    weight: 1.5,
    category: 'readiness'
  },
  {
    id: 'communication_automation',
    prompt: 'How automated are customer/internal communications?',
    type: 'single',
    choices: [
      { value: 1, label: 'Fully manual' },
      { value: 2, label: 'Partially automated' },
      { value: 3, label: 'Mostly automated' },
      { value: 4, label: 'Fully automated' },
      { value: 5, label: 'AI-personalized' }
    ],
    weight: 1,
    category: 'automation'
  },
  {
    id: 'lead_management',
    prompt: 'How efficient is your lead qualification and routing process?',
    type: 'single',
    choices: [
      { value: 1, label: 'Fully manual' },
      { value: 2, label: 'Basic automation' },
      { value: 3, label: 'Some automation' },
      { value: 4, label: 'Highly automated' },
      { value: 5, label: 'AI-powered prioritization' }
    ],
    weight: 1.5,
    category: 'automation'
  },
  {
    id: 'data_quality',
    prompt: 'How clean and consistent is your operational data?',
    type: 'single',
    choices: [
      { value: 1, label: 'Poor quality' },
      { value: 2, label: 'Inconsistent' },
      { value: 3, label: 'Acceptable' },
      { value: 4, label: 'Good quality' },
      { value: 5, label: 'Excellent quality' }
    ],
    weight: 1.5,
    category: 'readiness'
  },
  {
    id: 'tool_sprawl',
    prompt: 'How many different tools require manual context switching?',
    type: 'single',
    choices: [
      { value: 5, label: '10+ different tools' },
      { value: 4, label: '6-10 tools' },
      { value: 3, label: '3-5 tools' },
      { value: 2, label: '2-3 tools' },
      { value: 1, label: '1-2 tools' }
    ],
    weight: 1.5,
    category: 'automation'
  },
  {
    id: 'training_burden',
    prompt: 'How difficult is it for new team members to learn your systems?',
    type: 'single',
    choices: [
      { value: 5, label: 'Very difficult (months)' },
      { value: 4, label: 'Moderately difficult (weeks)' },
      { value: 3, label: 'Normal (days to weeks)' },
      { value: 2, label: 'Easy (days)' },
      { value: 1, label: 'Very easy (hours)' }
    ],
    weight: 1,
    category: 'readiness'
  },
  {
    id: 'budget_for_automation',
    prompt: 'Do you have budget allocated for automation initiatives this year?',
    type: 'single',
    choices: [
      { value: 1, label: 'No budget' },
      { value: 2, label: 'Minimal budget' },
      { value: 3, label: 'Some budget' },
      { value: 4, label: 'Solid budget' },
      { value: 5, label: 'Significant budget' }
    ],
    weight: 2,
    category: 'readiness'
  },
  // Qualifying questions (3)
  {
    id: 'decision_power',
    prompt: 'Your role in approving AI / automation projects?',
    type: 'single',
    choices: [
      { value: 5, label: 'Final decision maker' },
      { value: 3, label: 'Influencer' },
      { value: 1, label: 'Researcher' }
    ],
    weight: 2,
    category: 'qualifying'
  },
  {
    id: 'timeline',
    prompt: 'When do you want this solved?',
    type: 'single',
    choices: [
      { value: 5, label: 'Immediately (this quarter)' },
      { value: 3, label: '3-6 months' },
      { value: 1, label: 'Just exploring' }
    ],
    weight: 1.5,
    category: 'qualifying'
  },
  {
    id: 'cost_of_pain',
    prompt: 'Rough monthly cost of this bottleneck?',
    type: 'single',
    choices: [
      { value: 1, label: '<$5K' },
      { value: 2, label: '$5K-$20K' },
      { value: 3, label: '$20K-$100K' },
      { value: 5, label: '$100K+' }
    ],
    weight: 2,
    category: 'qualifying'
  }
];

export function getQuestionById(id: string): Question | undefined {
  return questions.find(q => q.id === id);
}

