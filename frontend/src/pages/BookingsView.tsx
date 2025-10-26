import { useEffect, useState } from 'react'

interface Booking {
  id: string
  leadId: string
  hoursLost: string
  priority: string
  bringOutline: string
  createdAt: string
  lead: {
    fullName: string
    email: string
    dealPriority: number
    aiReadinessScore: number
    automationGapPercent: number
  }
}

interface BookingsData {
  bookings: Booking[]
  stats: {
    totalBookings: number
    pendingBookings: number
    highPriorityBookings: number
  }
}

export default function BookingsView() {
  const [data, setData] = useState<BookingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">No bookings available</div>
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 neon-cyan">AI Ops Sprint Call Bookings</h1>
          <p className="text-gray-400">All booking requests sorted by submission date</p>
          <div className="mt-4">
            <a
              href="/admin"
              className="inline-block px-6 py-3 border-2 border-gray-700 rounded-lg font-bold hover:border-gray-500 transition-all"
            >
              ← Back to Admin Dashboard
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-neon-cyan">{data.stats.totalBookings}</div>
            <div className="text-gray-400">Total Bookings</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">{data.stats.pendingBookings}</div>
            <div className="text-gray-400">Pending Bookings</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">{data.stats.highPriorityBookings}</div>
            <div className="text-gray-400">High Priority</div>
          </div>
        </div>

        {/* Bookings List */}
        {data.bookings.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-xl text-gray-400">No bookings yet</p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-4 text-left text-sm font-bold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Hours Lost</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Deal Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Submitted</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-800 hover:bg-gray-900/50">
                      <td className="px-6 py-4">{booking.lead.fullName}</td>
                      <td className="px-6 py-4 text-gray-400">{booking.lead.email}</td>
                      <td className="px-6 py-4">{booking.hoursLost}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-sm">
                          {booking.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-sm font-bold ${
                          booking.lead.dealPriority >= 70 ? 'bg-green-500/20 text-green-400' :
                          booking.lead.dealPriority >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {booking.lead.dealPriority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-neon-cyan hover:underline text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">Booking Details</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-neon-cyan mb-3">Lead Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-gray-400">Name:</strong>
                      <p>{selectedBooking.lead.fullName}</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">Email:</strong>
                      <p>{selectedBooking.lead.email}</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">AI Readiness:</strong>
                      <p className="text-neon-cyan">{selectedBooking.lead.aiReadinessScore}%</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">Automation Gap:</strong>
                      <p className="text-neon-magenta">{selectedBooking.lead.automationGapPercent}%</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">Deal Priority:</strong>
                      <p>{selectedBooking.lead.dealPriority}</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">Submitted:</strong>
                      <p>{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-lg font-bold text-neon-purple mb-3">Booking Request</h4>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-gray-400">Hours lost per week:</strong>
                      <p className="text-lg">{selectedBooking.hoursLost}</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">What improves first:</strong>
                      <p className="text-lg capitalize">{selectedBooking.priority}</p>
                    </div>
                    <div>
                      <strong className="text-gray-400">Bring automation outline:</strong>
                      <p className="text-lg">{selectedBooking.bringOutline}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-lg font-bold mb-3">Next Steps</h4>
                  <div className="space-y-2">
                    <p className="text-gray-400">• Schedule AI Ops Sprint call</p>
                    <p className="text-gray-400">• Prepare automation outline based on their priority</p>
                    <p className="text-gray-400">• Review their readiness score: {selectedBooking.lead.aiReadinessScore}%</p>
                    <p className="text-gray-400">• Address their automation gap: {selectedBooking.lead.automationGapPercent}%</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

