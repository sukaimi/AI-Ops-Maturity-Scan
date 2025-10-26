import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../store/quizStore'

// Question data (should match backend structure)
const questions = [
  {
    id: 'automation_level',
    prompt: 'What percentage of repetitive tasks are currently automated?',
    choices: [
      { value: 1, label: '0-20%' },
      { value: 2, label: '20-40%' },
      { value: 3, label: '40-60%' },
      { value: 4, label: '60-80%' },
      { value: 5, label: '80-100%' }
    ]
  },
  {
    id: 'data_integration',
    prompt: 'How integrated are your data sources?',
    choices: [
      { value: 1, label: 'Siloed across departments' },
      { value: 2, label: 'Partial integration' },
      { value: 3, label: 'Mostly integrated' },
      { value: 4, label: 'Fully integrated' },
      { value: 5, label: 'AI-enhanced integration' }
    ]
  },
  {
    id: 'ai_tools',
    prompt: 'How many AI/automation tools does your team actively use?',
    choices: [
      { value: 1, label: 'None' },
      { value: 2, label: '1-2 tools' },
      { value: 3, label: '3-5 tools' },
      { value: 4, label: '6-10 tools' },
      { value: 5, label: '10+ tools' }
    ]
  },
  {
    id: 'workflow_bottlenecks',
    prompt: 'How often do manual bottlenecks delay critical processes?',
    choices: [
      { value: 5, label: 'Daily' },
      { value: 4, label: 'Weekly' },
      { value: 3, label: 'Monthly' },
      { value: 2, label: 'Rarely' },
      { value: 1, label: 'Never' }
    ]
  },
  {
    id: 'team_resources',
    prompt: 'How much time does your team spend on repetitive manual tasks per week?',
    choices: [
      { value: 5, label: '40+ hours' },
      { value: 4, label: '20-40 hours' },
      { value: 3, label: '10-20 hours' },
      { value: 2, label: '5-10 hours' },
      { value: 1, label: '0-5 hours' }
    ]
  },
  {
    id: 'crm_integration',
    prompt: 'How well is your CRM integrated with operational workflows?',
    choices: [
      { value: 1, label: 'Not integrated' },
      { value: 2, label: 'Basic integration' },
      { value: 3, label: 'Good integration' },
      { value: 4, label: 'Highly integrated' },
      { value: 5, label: 'AI-powered automation' }
    ]
  },
  {
    id: 'reporting_automation',
    prompt: 'How automated is your reporting and analytics?',
    choices: [
      { value: 1, label: 'Fully manual' },
      { value: 2, label: 'Partially automated' },
      { value: 3, label: 'Mostly automated' },
      { value: 4, label: 'Fully automated' },
      { value: 5, label: 'AI-driven insights' }
    ]
  },
  {
    id: 'scalability_readiness',
    prompt: 'How prepared are your processes for rapid scaling?',
    choices: [
      { value: 1, label: 'Not prepared' },
      { value: 2, label: 'Barely prepared' },
      { value: 3, label: 'Moderately prepared' },
      { value: 4, label: 'Well prepared' },
      { value: 5, label: 'Highly prepared' }
    ]
  },
  {
    id: 'error_handling',
    prompt: 'How well does your system handle errors and exceptions automatically?',
    choices: [
      { value: 1, label: 'Requires manual intervention' },
      { value: 2, label: 'Basic error handling' },
      { value: 3, label: 'Good error handling' },
      { value: 4, label: 'Automated recovery' },
      { value: 5, label: 'Predictive error prevention' }
    ]
  },
  {
    id: 'communication_automation',
    prompt: 'How automated are customer/internal communications?',
    choices: [
      { value: 1, label: 'Fully manual' },
      { value: 2, label: 'Partially automated' },
      { value: 3, label: 'Mostly automated' },
      { value: 4, label: 'Fully automated' },
      { value: 5, label: 'AI-personalized' }
    ]
  },
  {
    id: 'lead_management',
    prompt: 'How efficient is your lead qualification and routing process?',
    choices: [
      { value: 1, label: 'Fully manual' },
      { value: 2, label: 'Basic automation' },
      { value: 3, label: 'Some automation' },
      { value: 4, label: 'Highly automated' },
      { value: 5, label: 'AI-powered prioritization' }
    ]
  },
  {
    id: 'data_quality',
    prompt: 'How clean and consistent is your operational data?',
    choices: [
      { value: 1, label: 'Poor quality' },
      { value: 2, label: 'Inconsistent' },
      { value: 3, label: 'Acceptable' },
      { value: 4, label: 'Good quality' },
      { value: 5, label: 'Excellent quality' }
    ]
  },
  {
    id: 'tool_sprawl',
    prompt: 'How many different tools require manual context switching?',
    choices: [
      { value: 5, label: '10+ different tools' },
      { value: 4, label: '6-10 tools' },
      { value: 3, label: '3-5 tools' },
      { value: 2, label: '2-3 tools' },
      { value: 1, label: '1-2 tools' }
    ]
  },
  {
    id: 'training_burden',
    prompt: 'How difficult is it for new team members to learn your systems?',
    choices: [
      { value: 5, label: 'Very difficult (months)' },
      { value: 4, label: 'Moderately difficult (weeks)' },
      { value: 3, label: 'Normal (days to weeks)' },
      { value: 2, label: 'Easy (days)' },
      { value: 1, label: 'Very easy (hours)' }
    ]
  },
  {
    id: 'budget_for_automation',
    prompt: 'Do you have budget allocated for automation initiatives this year?',
    choices: [
      { value: 1, label: 'No budget' },
      { value: 2, label: 'Minimal budget' },
      { value: 3, label: 'Some budget' },
      { value: 4, label: 'Solid budget' },
      { value: 5, label: 'Significant budget' }
    ]
  },
  {
    id: 'decision_power',
    prompt: 'Your role in approving AI / automation projects?',
    choices: [
      { value: 5, label: 'Final decision maker' },
      { value: 3, label: 'Influencer' },
      { value: 1, label: 'Researcher' }
    ]
  },
  {
    id: 'timeline',
    prompt: 'When do you want this solved?',
    choices: [
      { value: 5, label: 'Immediately (this quarter)' },
      { value: 3, label: '3-6 months' },
      { value: 1, label: 'Just exploring' }
    ]
  },
  {
    id: 'cost_of_pain',
    prompt: 'Rough monthly cost of this bottleneck?',
    choices: [
      { value: 1, label: '<$5K' },
      { value: 2, label: '$5K-$20K' },
      { value: 3, label: '$20K-$100K' },
      { value: 5, label: '$100K+' }
    ]
  }
]

export default function Quiz() {
  const navigate = useNavigate()
  const { currentQuestionIndex, answers, setAnswer, nextQuestion, prevQuestion } = useQuizStore()
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  useEffect(() => {
    const currentQ = questions[currentQuestionIndex]
    setSelectedValue(answers[currentQ.id] || null)
  }, [currentQuestionIndex, answers])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleNext = () => {
    if (selectedValue === null) return
    
    setAnswer(currentQuestion.id, selectedValue)
    
    if (currentQuestionIndex === questions.length - 1) {
      navigate('/email-gate')
    } else {
      nextQuestion()
      setSelectedValue(null)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      prevQuestion()
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-sm text-neon-cyan">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-white">
            {currentQuestion.prompt}
          </h2>
          
          <div className="space-y-4">
            {currentQuestion.choices.map((choice) => (
              <button
                key={choice.value}
                onClick={() => setSelectedValue(choice.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedValue === choice.value
                    ? 'border-neon-cyan bg-cyan-500/10 neon-glow'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-8 py-3 border-2 border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={selectedValue === null}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

