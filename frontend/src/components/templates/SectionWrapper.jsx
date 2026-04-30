export default function SectionWrapper({ sectionKey, onRegenerate, regenerating, children, dark = false }) {
  const isLoading = regenerating === sectionKey

  return (
    <div className="relative group">
      {children}
      <button
        onClick={() => onRegenerate(sectionKey)}
        disabled={isLoading}
        title={`Regenerate ${sectionKey.replace('_', ' ')}`}
        className={`
          absolute top-3 right-3 z-10
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          opacity-0 group-hover:opacity-100 transition-all duration-200
          disabled:cursor-not-allowed
          ${dark
            ? 'bg-white/20 hover:bg-white/30 text-white disabled:bg-white/10'
            : 'bg-black/8 hover:bg-black/15 text-gray-700 disabled:bg-black/5'
          }
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Regenerating...
          </>
        ) : (
          <>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </>
        )}
      </button>
    </div>
  )
}
