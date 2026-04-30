import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

const TONE_OPTIONS = ['Professional', 'Casual', 'Persuasive', 'Energetic', 'Luxury']

const TEMPLATES = [
  { id: 'modern',  label: 'Modern',  desc: 'Indigo gradient', icon: '🎨' },
  { id: 'bold',    label: 'Bold',    desc: 'Dark & orange',   icon: '⚡' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean & elegant', icon: '✦' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [template, setTemplate] = useState('modern')
  const [form, setForm] = useState({
    product_name: '',
    description: '',
    features: '',
    target_audience: '',
    price: '',
    usp: '',
    tone: 'Professional',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/sales-pages', form)
      navigate(`/preview/${res.data.data.id}`, { state: { page: res.data.data, template } })
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) {
        setError(Object.values(errors).flat().join(' '))
      } else {
        setError(err.response?.data?.message || 'Generation failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Generate Sales Page</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in your product details and let AI write your sales copy.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Template Picker */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 text-base mb-4">Design Template</h2>
            <div className="grid grid-cols-3 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${
                    template === t.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <p className="font-semibold text-sm mt-1">{t.label}</p>
                  <p className={`text-xs mt-0.5 ${template === t.id ? 'text-indigo-400' : 'text-gray-400'}`}>{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-semibold text-gray-800 text-base">Product Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product / Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.product_name}
                  onChange={update('product_name')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g. ProTask Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.price}
                  onChange={update('price')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g. $29/month or Rp 299.000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={update('description')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="Briefly describe what your product/service does..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Features <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.features}
                onChange={update('features')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g. Real-time collaboration, Analytics dashboard, Mobile app"
              />
              <p className="text-xs text-gray-400 mt-1">Separate features with commas</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.target_audience}
                  onChange={update('target_audience')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g. Remote teams, Freelancers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select
                  value={form.tone}
                  onChange={update('tone')}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  {TONE_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unique Selling Point <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={form.usp}
                onChange={update('usp')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="What makes your product unique?"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating your sales page...
              </>
            ) : (
              'Generate Sales Page'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
