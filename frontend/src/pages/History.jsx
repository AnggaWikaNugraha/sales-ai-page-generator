import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function History() {
  const navigate = useNavigate()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState(null)

  const fetchPages = async (q = '') => {
    setLoading(true)
    try {
      const res = await api.get('/sales-pages', { params: q ? { search: q } : {} })
      setPages(res.data.data)
    } catch {
      setPages([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchPages(search)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this sales page?')) return
    setDeleting(id)
    try {
      await api.delete(`/sales-pages/${id}`)
      setPages((prev) => prev.filter((p) => p.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">History</h1>
            <p className="text-gray-500 text-sm mt-1">Your previously generated sales pages</p>
          </div>
          <Link
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + New Page
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mb-6 flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Search by product name..."
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📄</div>
            <p className="text-gray-500 text-lg">No sales pages yet.</p>
            <Link to="/dashboard" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">
              Generate your first one
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:border-indigo-200 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{page.product_name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{formatDate(page.created_at)}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
                      {page.status}
                    </span>
                    {page.input?.price && (
                      <span className="text-xs text-gray-500">{page.input.price}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <button
                    onClick={() => navigate(`/preview/${page.id}`, { state: { page } })}
                    className="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    disabled={deleting === page.id}
                    className="text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleting === page.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
