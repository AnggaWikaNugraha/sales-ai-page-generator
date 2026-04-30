import SectionWrapper from './SectionWrapper'

export default function ModernTemplate({ page, content: c, onRegenerate, regenerating }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">

      {/* Hero */}
      <SectionWrapper sectionKey="headline" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-16 text-center text-white">
          <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            {page.input?.target_audience}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{c.headline}</h1>
          <SectionWrapper sectionKey="sub_headline" onRegenerate={onRegenerate} regenerating={regenerating} dark>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">{c.sub_headline}</p>
          </SectionWrapper>
          <SectionWrapper sectionKey="cta" onRegenerate={onRegenerate} regenerating={regenerating} dark>
            <div className="mt-8">
              <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-indigo-50 transition-colors shadow-lg">
                {c.cta.primary}
              </button>
              <p className="text-indigo-200 text-sm mt-3">{c.cta.secondary}</p>
            </div>
          </SectionWrapper>
        </div>
      </SectionWrapper>

      {/* Description */}
      <SectionWrapper sectionKey="description" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-8 py-12 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {page.product_name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{c.description}</p>
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper sectionKey="benefits" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-8 py-12 bg-indigo-50 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-indigo-100">
                <span className="text-indigo-600 font-bold text-lg leading-none mt-0.5">✓</span>
                <p className="text-gray-700 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper sectionKey="features" onRegenerate={onRegenerate} regenerating={regenerating}>
        <div className="px-8 py-12 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.features.map((feature, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Social Proof */}
      <div className="px-8 py-12 bg-gray-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {c.social_proof.map((sp, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-gray-600 text-sm italic mb-4">"{sp.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{sp.name}</p>
                <p className="text-gray-400 text-xs">{sp.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="px-8 py-12 text-center border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Simple, Transparent Pricing</h2>
        <div className="max-w-sm mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
          <div className="text-4xl font-bold mb-1">{c.pricing.price}</div>
          <div className="text-indigo-200 text-sm mb-6">{c.pricing.billing}</div>
          <div className="space-y-3 mb-8">
            {c.pricing.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-green-300">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="text-indigo-200 text-xs">{c.pricing.guarantee}</div>
        </div>
      </div>

      {/* Final CTA */}
      <SectionWrapper sectionKey="cta" onRegenerate={onRegenerate} regenerating={regenerating} dark>
        <div className="px-8 py-16 text-center bg-gradient-to-br from-gray-900 to-gray-800">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">{c.cta.secondary}</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors">
            {c.cta.primary}
          </button>
        </div>
      </SectionWrapper>
    </div>
  )
}
