import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 neon-cyan font-mono">
            Code&Canvas
          </h1>
          <h2 className="text-4xl font-bold mb-6 neon-magenta">
            AI Ops Maturity Scan™
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Diagnose automation gaps & uncover 3× ROI within 90 days.
          </p>
        </div>

        {/* Proof Bullets */}
        <div className="glass rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan text-2xl font-bold">✓</div>
              <p className="text-lg">Eliminated 40+ hrs/week of manual ops in &lt; 30 days.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan text-2xl font-bold">✓</div>
              <p className="text-lg">Built AI pipelines producing 2–5× ROI in 1 quarter.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan text-2xl font-bold">✓</div>
              <p className="text-lg">We deliver builds, not decks.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 neon-glow"
          >
            START THE SCAN
          </button>
        </div>

        {/* Tagline */}
        <div className="text-center mt-12">
          <p className="text-xl text-gray-400 italic">
            "We design and deploy AI-driven workflows that pay for themselves."
          </p>
        </div>
      </div>
    </div>
  )
}

