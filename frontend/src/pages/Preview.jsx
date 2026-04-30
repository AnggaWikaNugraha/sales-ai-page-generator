import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ModernTemplate from '../components/templates/ModernTemplate'
import BoldTemplate from '../components/templates/BoldTemplate'
import MinimalTemplate from '../components/templates/MinimalTemplate'
import { generateStandaloneHtml } from '../utils/exportHtml'
import api from '../services/api'

const TEMPLATES = [
  { id: 'modern',  label: 'Modern',  desc: 'Indigo gradient, clean cards' },
  { id: 'bold',    label: 'Bold',    desc: 'Dark background, orange accents' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean white, elegant typography' },
]

const TEMPLATE_MAP = { modern: ModernTemplate, bold: BoldTemplate, minimal: MinimalTemplate }

const SECTION_LABELS = {
  headline:     'Headline',
  sub_headline: 'Sub-headline',
  description:  'Description',
  benefits:     'Benefits',
  features:     'Features',
  cta:          'Call to Action',
}

export default function Preview() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [page, setPage] = useState(location.state?.page || null)
  const [content, setContent] = useState(location.state?.page?.content || null)
  const [template, setTemplate] = useState(location.state?.template || 'modern')
  const [loading, setLoading] = useState(!page)
  const [regenerating, setRegenerating] = useState(false)
  const [regeneratingSection, setRegeneratingSection] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!page) {
      api.get(`/sales-pages/${id}`)
        .then((res) => {
          setPage(res.data.data)
          setContent(res.data.data.content)
        })
        .catch(() => navigate('/history'))
        .finally(() => setLoading(false))
    }
  }, [id])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    try {
      const res = await api.post(`/sales-pages/${id}/regenerate`)
      setPage(res.data.data)
      setContent(res.data.data.content)
      showToast('Sales page regenerated!')
    } catch {
      showToast('Regeneration failed.', 'error')
    } finally {
      setRegenerating(false)
    }
  }

  const handleRegenerateSection = async (section) => {
    setRegeneratingSection(section)
    try {
      const res = await api.post(`/sales-pages/${id}/regenerate-section`, { section })
      setContent((prev) => ({ ...prev, [section]: res.data.content }))
      showToast(`${SECTION_LABELS[section]} regenerated!`)
    } catch {
      showToast('Section regeneration failed.', 'error')
    } finally {
      setRegeneratingSection(null)
    }
  }

  const handleExportTxt = () => {
    const c = content
    const text = [
      `=== ${page.product_name} — Sales Page ===\n`,
      `HEADLINE\n${c.headline}\n`,
      `SUB-HEADLINE\n${c.sub_headline}\n`,
      `DESCRIPTION\n${c.description}\n`,
      `BENEFITS\n${c.benefits.map((b) => `• ${b}`).join('\n')}\n`,
      `FEATURES\n${c.features.map((f) => `• ${f.title}: ${f.description}`).join('\n')}\n`,
      `PRICING\n${c.pricing.price} ${c.pricing.billing}\n${c.pricing.includes.map((i) => `✓ ${i}`).join('\n')}\n`,
      `CALL TO ACTION\n${c.cta.primary}\n${c.cta.secondary}`,
    ].join('\n')
    downloadFile(text, `${slug(page.product_name)}-sales-page.txt`, 'text/plain')
  }

  const handleExportHtml = () => {
    const html = generateStandaloneHtml(page, template)
    downloadFile(html, `${slug(page.product_name)}-sales-page.html`, 'text/html')
    showToast('HTML file downloaded!')
  }

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const slug = (str) => str.replace(/\s+/g, '-').toLowerCase()

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    </div>
  )

  if (!page || !content) return null

  const TemplateComponent = TEMPLATE_MAP[template]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <button onClick={() => navigate('/history')} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            ← History
          </button>
          <span className="text-gray-300 hidden sm:block">|</span>
          <span className="text-sm font-medium text-gray-700 hidden sm:block truncate max-w-[160px]">{page.product_name}</span>

          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {/* Export buttons */}
            <div className="relative group">
              <button className="text-sm border border-gray-300 hover:border-gray-400 text-gray-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-44 hidden group-hover:block z-10">
                <button onClick={handleExportTxt} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <span>📄</span> Export as .txt
                </button>
                <button onClick={handleExportHtml} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <span>🌐</span> Export as .html
                </button>
              </div>
            </div>

            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              {regenerating ? 'Regenerating...' : '↺ Regenerate All'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Template Switcher */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Design Template</p>
          <div className="flex gap-3 flex-wrap">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  template === t.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <span className="font-semibold">{t.label}</span>
                <span className={`block text-xs font-normal mt-0.5 ${template === t.id ? 'text-indigo-400' : 'text-gray-400'}`}>
                  {t.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Regen Quick Bar */}
        <div className="mb-6 bg-white border border-gray-200 rounded-xl px-4 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-400 font-medium mr-1">Regenerate section:</span>
          {Object.entries(SECTION_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleRegenerateSection(key)}
              disabled={!!regeneratingSection}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
                regeneratingSection === key
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-600'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {regeneratingSection === key ? (
                <span className="flex items-center gap-1">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {label}
                </span>
              ) : label}
            </button>
          ))}
        </div>

        {/* Hover hint */}
        <p className="text-xs text-gray-400 mb-4 text-center">
          💡 Hover over any section in the preview to regenerate it individually
        </p>

        {/* Sales Page Preview */}
        <TemplateComponent
          page={page}
          content={content}
          onRegenerate={handleRegenerateSection}
          regenerating={regeneratingSection}
        />
      </div>
    </div>
  )
}
