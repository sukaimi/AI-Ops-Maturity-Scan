import { useEffect, useState } from 'react'

interface Lead {
  id: string
  fullName: string
  email: string
  aiReadinessScore: number
  automationGapPercent: number
  roiPotentialPercent: number
  dealPriority: number
  decisionPower: number
  timeline: number
  costOfPain: number
  createdAt: string
}

interface DashboardData {
  leads: Lead[]
  stats: {
    totalLeads: number
    avgReadinessScore: number
    avgDealPriority: number
    highPriorityLeads: number
  }
}

interface FullLeadDetails {
  id: string
  fullName: string
  email: string
  aiReadinessScore: number
  automationGapPercent: number
  roiPotentialPercent: number
  dealPriority: number
  decisionPower: number
  timeline: number
  costOfPain: number
  reportSections: any
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [fullLeadDetails, setFullLeadDetails] = useState<FullLeadDetails | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewLead = async (lead: Lead) => {
    setSelectedLead(lead)
    setLoadingDetails(true)
    try {
      const response = await fetch(`/api/lead/${lead.id}`)
      const details = await response.json()
      setFullLeadDetails(details)
    } catch (err) {
      console.error('Error fetching lead details:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleDownloadPDF = () => {
    if (selectedLead) {
      window.open(`/api/pdf/${selectedLead.id}`, '_blank')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">No data available</div>
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 neon-cyan">Lead Dashboard</h1>
          <p className="text-gray-400">Sorted by Deal Priority</p>
          <div className="mt-4">
            <a
              href="/admin/bookings"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg font-bold hover:from-cyan-400 hover:to-magenta-400 transition-all"
            >
              View AI Ops Sprint Bookings →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-neon-cyan">{data.stats.totalLeads}</div>
            <div className="text-gray-400">Total Leads</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-neon-magenta">{Math.round(data.stats.avgReadinessScore)}%</div>
            <div className="text-gray-400">Avg Readiness</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">{Math.round(data.stats.avgDealPriority)}</div>
            <div className="text-gray-400">Avg Priority</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">{data.stats.highPriorityLeads}</div>
            <div className="text-gray-400">High Priority</div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-4 text-left text-sm font-bold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Readiness</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Gap</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">ROI</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-gray-800 hover:bg-gray-900/50">
                    <td className="px-6 py-4">{lead.fullName}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-neon-cyan">{lead.aiReadinessScore}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neon-magenta">{lead.automationGapPercent}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400">{lead.roiPotentialPercent}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-sm font-bold ${
                        lead.dealPriority >= 70 ? 'bg-green-500/20 text-green-400' :
                        lead.dealPriority >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {lead.dealPriority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="text-neon-cyan hover:underline text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {loadingDetails ? (
                <div className="text-center py-12">
                  <p className="text-xl">Loading details...</p>
                </div>
              ) : fullLeadDetails ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{fullLeadDetails.fullName}</h3>
                      <p className="text-gray-400">{fullLeadDetails.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedLead(null)
                        setFullLeadDetails(null)
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="glass rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-neon-cyan mb-1">{Math.round(fullLeadDetails.aiReadinessScore)}%</div>
                      <div className="text-sm text-gray-400">AI Readiness</div>
                    </div>
                    <div className="glass rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-neon-magenta mb-1">{Math.round(fullLeadDetails.automationGapPercent)}%</div>
                      <div className="text-sm text-gray-400">Automation Gap</div>
                    </div>
                    <div className="glass rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">{Math.round(fullLeadDetails.roiPotentialPercent)}%</div>
                      <div className="text-sm text-gray-400">ROI Potential</div>
                    </div>
                  </div>

                  {/* Report Sections */}
                  {fullLeadDetails.reportSections && (
                    <div className="space-y-6">
                      {/* Executive Summary */}
                      <div className="glass rounded-lg p-6">
                        <h4 className="text-xl font-bold mb-3 neon-magenta">Executive Summary</h4>
                        <p className="text-gray-300">{fullLeadDetails.reportSections.executiveSummary}</p>
                      </div>

                      {/* Performance Gaps */}
                      {fullLeadDetails.reportSections.performanceGaps && (
                        <div className="glass rounded-lg p-6">
                          <h4 className="text-xl font-bold mb-3 neon-cyan">Performance Gaps</h4>
                          <div className="space-y-2">
                            {fullLeadDetails.reportSections.performanceGaps.map((gap: any, idx: number) => (
                              <div key={idx} className="p-3 bg-gray-900 rounded">
                                <div className="flex justify-between items-start mb-1">
                                  <strong>{gap.area}</strong>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    gap.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                                    gap.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    {gap.severity}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400">{gap.impact}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fast Wins */}
                      {fullLeadDetails.reportSections.fastWins && (
                        <div className="glass rounded-lg p-6">
                          <h4 className="text-xl font-bold mb-3 neon-purple">Fast Wins</h4>
                          <div className="space-y-3">
                            {fullLeadDetails.reportSections.fastWins.map((win: any, idx: number) => (
                              <div key={idx} className="p-3 bg-gray-900 rounded">
                                <h5 className="font-bold mb-2">{idx + 1}. {win.title}</h5>
                                <div className="text-sm space-y-1">
                                  <p><span className="text-gray-400">Impact:</span> {win.impact}</p>
                                  <p><span className="text-gray-400">Timeline:</span> {win.timeline}</p>
                                  <p><span className="text-gray-400">ROI:</span> <span className="text-green-400">{win.roi}</span></p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Qualifying Info */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <strong className="text-gray-400 block mb-1">Deal Priority:</strong>
                      <span className="text-lg font-bold">{fullLeadDetails.dealPriority}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 block mb-1">Decision Power:</strong>
                      <span className="text-lg">{fullLeadDetails.decisionPower}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 block mb-1">Timeline:</strong>
                      <span className="text-lg">{fullLeadDetails.timeline}</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Actions */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 rounded-lg font-bold transition-all"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    setSelectedLead(null)
                    setFullLeadDetails(null)
                  }}
                  className="px-6 py-3 border-2 border-gray-700 hover:border-gray-500 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

