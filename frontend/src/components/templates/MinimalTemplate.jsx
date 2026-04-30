import SectionWrapper from './SectionWrapper'

export default function MinimalTemplate({ page, content: c, onRegenerate, regenerating }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">

      {/* Hero */}
      <SectionWrapper sectionKey="headline" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-10 pt-20 pb-16 border-b-4 border-gray-900 text-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-8">
            {page.input?.target_audience}
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 leading-tight mb-6 max-w-3xl mx-auto">
            {c.headline}
          </h1>
          <SectionWrapper sectionKey="sub_headline" onRegenerate={onRegenerate} regenerating={regenerating}>
            <p className="text-gray-500 text-xl max-w-xl mx-auto font-light">{c.sub_headline}</p>
          </SectionWrapper>
          <SectionWrapper sectionKey="cta" onRegenerate={onRegenerate} regenerating={regenerating}>
            <div className="mt-10">
              <button className="bg-gray-900 hover:bg-gray-700 text-white font-medium px-10 py-4 text-base transition-colors">
                {c.cta.primary}
              </button>
              <p className="text-gray-400 text-sm mt-4 font-light">{c.cta.secondary}</p>
            </div>
          </SectionWrapper>
        </div>
      </SectionWrapper>

      {/* Description */}
      <SectionWrapper sectionKey="description" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-10 py-16 border-b border-gray-100 max-w-3xl mx-auto w-full">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            About
          </p>
          <p className="text-gray-700 text-xl font-light leading-loose">{c.description}</p>
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper sectionKey="benefits" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-10 py-16 bg-gray-50 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-10 text-center">
            Why It Matters
          </p>
          <div className="max-w-2xl mx-auto space-y-5">
            {c.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-5">
                <span className="text-gray-900 font-light text-sm w-6 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <p className="text-gray-700 font-light text-base border-b border-gray-200 pb-5 flex-1">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper sectionKey="features" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-10 py-16 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-10 text-center">
            Features
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-3xl mx-auto border border-gray-200">
            {c.features.map((feature, i) => (
              <div
                key={i}
                className={`p-6 ${i % 2 === 0 ? 'border-r border-gray-200' : ''} ${i < c.features.length - 2 ? 'border-b border-gray-200' : ''}`}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wider">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Social Proof */}
      <div className="px-10 py-16 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-10 text-center">
          Testimonials
        </p>
        <div className="max-w-3xl mx-auto space-y-8">
          {c.social_proof.map((sp, i) => (
            <div key={i} className="flex gap-6 border-b border-gray-200 pb-8 last:border-0 last:pb-0">
              <div className="w-8 h-8 bg-gray-900 rounded-full shrink-0 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{sp.name[0]}</span>
              </div>
              <div>
                <p className="text-gray-700 font-light text-base mb-3">"{sp.quote}"</p>
                <p className="text-gray-900 font-semibold text-sm">{sp.name}</p>
                <p className="text-gray-400 text-xs">{sp.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="px-10 py-16 border-b border-gray-100 text-center">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-10">
          Pricing
        </p>
        <div className="max-w-xs mx-auto border-2 border-gray-900 p-8">
          <div className="text-5xl font-light text-gray-900 mb-1">{c.pricing.price}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-8">{c.pricing.billing}</div>
          <div className="space-y-3 mb-8 text-left">
            {c.pricing.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-gray-400">—</span>
                <span className="text-gray-600 font-light">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs">{c.pricing.guarantee}</p>
        </div>
      </div>

      {/* Final CTA */}
      <SectionWrapper sectionKey="cta" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-10 py-20 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-3">{c.cta.primary}</h2>
          <p className="text-gray-400 mb-10 font-light">{c.cta.secondary}</p>
          <button className="bg-gray-900 hover:bg-gray-700 text-white font-medium px-12 py-4 text-base transition-colors">
            Get Started
          </button>
        </div>
      </SectionWrapper>
    </div>
  )
}
