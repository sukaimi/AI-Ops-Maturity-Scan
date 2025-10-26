import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../store/quizStore'

export default function EmailGate() {
  const navigate = useNavigate()
  const { answers, setUserInfo, setScores, setReportSections, setLeadId } = useQuizStore()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Trigger scoring when component mounts
    const calculateScores = async () => {
      try {
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers })
        })
        const scores = await response.json()
        setScores(scores)
      } catch (err) {
        console.error('Error calculating scores:', err)
      }
    }
    calculateScores()
  }, [answers, setScores])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!fullName.trim() || !email.trim()) {
      setError('Please fill in all fields')
      return
    }

    // Basic business email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // First, calculate scores if not already done
      const scoresRes = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })
      const scores = await scoresRes.json()

      // Generate report
      const reportRes = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, scores })
      })
      const report = await reportRes.json()

      // Save lead
      const leadRes = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          answers,
          scores,
          reportSnippet: report.executiveSummary,
          reportSections: report
        })
      })

      if (!leadRes.ok) {
        const err = await leadRes.json()
        throw new Error(err.error || 'Failed to save lead')
      }

      const leadData = await leadRes.json()
      
      // Store lead ID in both localStorage and state for PDF export
      if (leadData.leadId) {
        localStorage.setItem('leadId', leadData.leadId)
        setLeadId(leadData.leadId)
      }

      setUserInfo({ fullName, email })
      setScores(scores)
      setReportSections(report)
      navigate('/report')
    } catch (err: any) {
      setError(err.message || 'Failed to process request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4 neon-cyan">
            Your AI Ops Uplift Plan™ is ready
          </h2>
          <p className="text-gray-400 mb-8">
            Enter your details to receive your personalized report
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-neon-cyan focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Business Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-neon-cyan focus:outline-none transition-colors"
                required
                placeholder="your.company@business.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Business email required for personalized enterprise insights
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
            >
              {loading ? 'Generating Report...' : 'Generate My Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

