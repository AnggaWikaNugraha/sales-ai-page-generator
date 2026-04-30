import SectionWrapper from './SectionWrapper'

export default function BoldTemplate({ page, content: c, onRegenerate, regenerating }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-700">

      {/* Hero */}
      <SectionWrapper sectionKey="headline" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="px-8 py-20 text-center border-b border-zinc-700">
          <span className="inline-block bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            {page.input?.target_audience || 'For Professionals'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-none mb-5 uppercase tracking-tight">
            {c.headline}
          </h1>
          <SectionWrapper sectionKey="sub_headline" onRegenerate={onRegenerate} regenerating={regenerating} dark>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto font-medium">{c.sub_headline}</p>
          </SectionWrapper>
          <SectionWrapper sectionKey="cta" onRegenerate={onRegenerate} regenerating={regenerating} dark>
            <div className="mt-10">
              <button className="bg-orange-500 hover:bg-orange-400 text-white font-black px-10 py-5 rounded-xl text-xl uppercase tracking-wide transition-colors">
                {c.cta.primary}
              </button>
              <p className="text-zinc-500 text-sm mt-4">{c.cta.secondary}</p>
            </div>
          </SectionWrapper>
        </div>
      </SectionWrapper>

      {/* Description */}
      <SectionWrapper sectionKey="description" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="px-8 py-14 border-b border-zinc-700">
          <div className="flex items-start gap-4">
            <div className="w-1 h-16 bg-orange-500 rounded-full shrink-0 mt-1"></div>
            <div>
              <h2 className="text-xl font-black text-orange-500 uppercase tracking-widest mb-4">
                About {page.product_name}
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed">{c.description}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper sectionKey="benefits" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="px-8 py-14 border-b border-zinc-700">
          <h2 className="text-xl font-black text-orange-500 uppercase tracking-widest mb-8">
            Why It Works
          </h2>
          <div className="space-y-4">
            {c.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 border border-zinc-700 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
                <span className="text-orange-500 font-black text-2xl w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-zinc-200 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper sectionKey="features" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="px-8 py-14 border-b border-zinc-700">
          <h2 className="text-xl font-black text-orange-500 uppercase tracking-widest mb-8">
            What You Get
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.features.map((feature, i) => (
              <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-orange-400 font-black">✦</span>
                </div>
                <h3 className="font-black text-white mb-2 uppercase tracking-wide text-sm">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Social Proof */}
      <div className="px-8 py-14 border-b border-zinc-700">
        <h2 className="text-xl font-black text-orange-500 uppercase tracking-widest mb-8">
          Real Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {c.social_proof.map((sp, i) => (
            <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
              <div className="text-orange-400 text-sm mb-3">★★★★★</div>
              <p className="text-zinc-300 text-sm italic mb-4">"{sp.quote}"</p>
              <div className="border-t border-zinc-700 pt-3">
                <p className="font-black text-white text-sm">{sp.name}</p>
                <p className="text-zinc-500 text-xs">{sp.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="px-8 py-14 text-center border-b border-zinc-700">
        <h2 className="text-xl font-black text-orange-500 uppercase tracking-widest mb-10">
          Investment
        </h2>
        <div className="max-w-sm mx-auto bg-zinc-800 border-2 border-orange-500 rounded-2xl p-8">
          <div className="text-5xl font-black text-white mb-1">{c.pricing.price}</div>
          <div className="text-zinc-400 text-sm mb-6 uppercase tracking-wider">{c.pricing.billing}</div>
          <div className="space-y-3 mb-8 text-left">
            {c.pricing.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-orange-400 font-bold">→</span>
                <span className="text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-zinc-500 text-xs">{c.pricing.guarantee}</div>
        </div>
      </div>

      {/* Final CTA */}
      <SectionWrapper sectionKey="cta" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="px-8 py-20 text-center bg-orange-500">
          <h2 className="text-4xl font-black text-white mb-4 uppercase">Stop Waiting. Start Now.</h2>
          <p className="text-orange-100 mb-8 font-medium">{c.cta.secondary}</p>
          <button className="bg-white text-orange-600 font-black px-10 py-4 rounded-xl text-xl uppercase tracking-wide hover:bg-orange-50 transition-colors">
            {c.cta.primary}
          </button>
        </div>
      </SectionWrapper>
    </div>
  )
}
