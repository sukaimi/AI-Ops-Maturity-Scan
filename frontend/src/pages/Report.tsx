import { useState } from 'react'
import { useQuizStore } from '../store/quizStore'

export default function Report() {
  const { scores, userInfo, reportSections, leadId } = useQuizStore()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingAnswers, setBookingAnswers] = useState({
    hoursLost: '',
    priority: '',
    bringOutline: ''
  })
  const [downloadingPDF, setDownloadingPDF] = useState(false)

  if (!scores || !reportSections) {
    return <div>Loading...</div>
  }

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true)
    try {
      // Get the lead ID from state or localStorage
      const leadIdToUse = leadId || localStorage.getItem('leadId')
      
      if (!leadIdToUse) {
        alert('Lead ID not found. Please complete the scan first.')
        return
      }
      
      window.open(`/api/pdf/${leadIdToUse}`, '_blank')
    } catch (err) {
      console.error('Error downloading PDF:', err)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setDownloadingPDF(false)
    }
  }

  const handleBookCall = () => {
    setShowBookingModal(true)
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Get the leadId
      const leadIdToUse = leadId || localStorage.getItem('leadId')
      
      if (!leadIdToUse) {
        alert('Unable to submit booking. Please try again.')
        return
      }

      // Send booking data to backend
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: leadIdToUse,
          hoursLost: bookingAnswers.hoursLost,
          priority: bookingAnswers.priority,
          bringOutline: bookingAnswers.bringOutline
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert('✅ Booking request received! We will contact you shortly.')
        setShowBookingModal(false)
        // Clear the form
        setBookingAnswers({
          hoursLost: '',
          priority: '',
          bringOutline: ''
        })
      } else {
        alert('Failed to submit booking. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Failed to submit booking. Please try again.')
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 neon-cyan">AI Ops Uplift Plan™</h1>
          <p className="text-xl text-gray-400">Prepared for {userInfo?.fullName}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-neon-cyan mb-2">
              {Math.round(scores.aiReadinessScore)}%
            </div>
            <div className="text-gray-400">AI Readiness Score</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-neon-magenta mb-2">
              {Math.round(scores.automationGapPercent)}%
            </div>
            <div className="text-gray-400">Automation Gap</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {Math.round(scores.roiPotentialPercent)}%
            </div>
            <div className="text-gray-400">ROI Uplift Potential</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 neon-magenta">Executive Summary</h2>
          <p className="text-lg leading-relaxed">{reportSections.executiveSummary}</p>
        </div>

        {/* Performance Gaps */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 neon-cyan">Performance Gaps</h2>
          <div className="space-y-4">
            {reportSections.performanceGaps.map((gap: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-900 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{gap.area}</h3>
                  <span className={`px-3 py-1 rounded ${
                    gap.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                    gap.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {gap.severity}
                  </span>
                </div>
                <p className="text-gray-400">{gap.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Wins */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 neon-purple">Fast Wins</h2>
          <div className="space-y-6">
            {reportSections.fastWins.map((win: any, idx: number) => (
              <div key={idx} className="p-6 bg-gray-900 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{idx + 1}. {win.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Impact:</span>
                    <p className="text-white">{win.impact}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Timeline:</span>
                    <p className="text-white">{win.timeline}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">ROI:</span>
                    <p className="text-green-400 font-bold">{win.roi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 90-Day Roadmap */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 neon-cyan">90-Day Roadmap</h2>
          <div className="space-y-6">
            {reportSections.roadmap90Days.map((phase: any, idx: number) => (
              <div key={idx} className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border-l-4 border-neon-cyan">
                <h3 className="text-2xl font-bold mb-2">{phase.phase}</h3>
                <p className="text-gray-300 mb-2"><strong>Focus:</strong> {phase.focus}</p>
                <p className="text-gray-300 mb-2"><strong>Timeline:</strong> {phase.timeline}</p>
                <p className="text-gray-300"><strong>Deliverables:</strong> {phase.deliverables}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Section */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 neon-magenta">ROI Projection</h2>
          <div className="text-6xl font-bold text-center text-green-400 mb-4">
            {reportSections.roiSection.potential}%
          </div>
          <p className="text-center text-gray-400 mb-6">{reportSections.roiSection.timeline}</p>
          <ul className="space-y-2">
            {reportSections.roiSection.components.map((component: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-neon-cyan">▸</span>
                <span>{component}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={handleDownloadPDF}
            disabled={downloadingPDF}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 neon-glow"
          >
            {downloadingPDF ? 'Downloading...' : 'Export Board-Ready PDF'}
          </button>
          <button
            onClick={handleBookCall}
            className="px-8 py-4 border-2 border-neon-cyan hover:bg-cyan-500/10 rounded-lg font-bold text-lg text-neon-cyan transition-all duration-300"
          >
            Request Your AI Ops Sprint ($0 Planning Call)
          </button>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-8 max-w-2xl w-full">
              <h3 className="text-2xl font-bold mb-4">Before we schedule your AI Ops Sprint call…</h3>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Hours lost per week to manual tasks?</label>
                  <input
                    type="text"
                    value={bookingAnswers.hoursLost}
                    onChange={(e) => setBookingAnswers({ ...bookingAnswers, hoursLost: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">What improves first if we fix this?</label>
                  <select
                    value={bookingAnswers.priority}
                    onChange={(e) => setBookingAnswers({ ...bookingAnswers, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="cost">Cost reduction</option>
                    <option value="speed">Speed/efficiency</option>
                    <option value="growth">Growth/scaling</option>
                    <option value="risk">Risk mitigation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Ok if we bring a full automation outline to the call?</label>
                  <input
                    type="text"
                    value={bookingAnswers.bringOutline}
                    onChange={(e) => setBookingAnswers({ ...bookingAnswers, bringOutline: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg"
                    placeholder="Yes/No"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg font-bold"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

