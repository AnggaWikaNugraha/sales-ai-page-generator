export function generateStandaloneHtml(page, template) {
  const c = page.content

  const themeStyles = {
    modern: {
      heroBg: 'linear-gradient(135deg, #4f46e5, #7e22ce)',
      heroText: '#ffffff',
      accent: '#4f46e5',
      accentLight: '#eef2ff',
      ctaBg: '#1f2937',
      cardBorder: '#e0e7ff',
    },
    bold: {
      heroBg: '#18181b',
      heroText: '#ffffff',
      accent: '#f97316',
      accentLight: '#1c1917',
      ctaBg: '#f97316',
      cardBorder: '#3f3f46',
    },
    minimal: {
      heroBg: '#ffffff',
      heroText: '#111827',
      accent: '#111827',
      accentLight: '#f9fafb',
      ctaBg: '#111827',
      cardBorder: '#e5e7eb',
    },
  }

  const t = themeStyles[template] || themeStyles.modern

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.product_name} — Sales Page</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; color: #374151; line-height: 1.6; }
    .container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

    /* Hero */
    .hero { background: ${t.heroBg}; padding: 80px 24px; text-align: center; }
    .hero-badge { display: inline-block; background: rgba(255,255,255,0.2); color: ${t.heroText}; font-size: 11px; font-weight: 700; padding: 6px 16px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; }
    .hero h1 { font-size: clamp(28px, 5vw, 44px); font-weight: 800; color: ${t.heroText}; line-height: 1.15; margin-bottom: 16px; max-width: 700px; margin-left: auto; margin-right: auto; }
    .hero p { font-size: 18px; color: rgba(255,255,255,0.8); max-width: 540px; margin: 0 auto 32px; }
    .btn-primary { display: inline-block; background: #ffffff; color: ${t.accent}; font-weight: 700; font-size: 18px; padding: 16px 40px; border-radius: 12px; text-decoration: none; margin-bottom: 12px; }
    .btn-note { display: block; font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 8px; }

    /* Sections */
    .section { padding: 64px 24px; }
    .section-alt { background: ${t.accentLight}; }
    .section-label { font-size: 11px; font-weight: 700; color: ${t.accent}; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px; }
    .section h2 { font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 32px; text-align: center; }
    .section > p { font-size: 17px; color: #4b5563; line-height: 1.8; max-width: 680px; margin: 0 auto; }

    /* Benefits */
    .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; max-width: 800px; margin: 0 auto; }
    .benefit-card { background: #fff; border: 1px solid ${t.cardBorder}; border-radius: 12px; padding: 16px 20px; display: flex; gap: 12px; align-items: flex-start; }
    .benefit-check { color: ${t.accent}; font-weight: 700; font-size: 18px; flex-shrink: 0; }
    .benefit-card p { font-size: 14px; color: #374151; }

    /* Features */
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; max-width: 800px; margin: 0 auto; }
    .feature-card { border: 1px solid ${t.cardBorder}; border-radius: 12px; padding: 24px; }
    .feature-card h3 { font-size: 15px; font-weight: 600; color: #111827; margin-bottom: 8px; }
    .feature-card p { font-size: 13px; color: #6b7280; }

    /* Testimonials */
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; max-width: 900px; margin: 0 auto; }
    .testimonial { background: #fff; border: 1px solid ${t.cardBorder}; border-radius: 12px; padding: 20px; }
    .testimonial .stars { color: #f59e0b; margin-bottom: 10px; font-size: 13px; }
    .testimonial blockquote { font-size: 13px; color: #4b5563; font-style: italic; margin-bottom: 14px; }
    .testimonial .author strong { font-size: 13px; font-weight: 600; color: #111827; display: block; }
    .testimonial .author span { font-size: 11px; color: #9ca3af; }

    /* Pricing */
    .pricing-box { max-width: 360px; margin: 0 auto; background: ${t.heroBg}; border-radius: 20px; padding: 40px; text-align: center; color: #fff; }
    .pricing-box .price { font-size: 48px; font-weight: 800; margin-bottom: 4px; }
    .pricing-box .billing { font-size: 13px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 28px; }
    .pricing-box ul { list-style: none; text-align: left; margin-bottom: 24px; }
    .pricing-box ul li { font-size: 14px; padding: 6px 0; display: flex; gap: 8px; opacity: 0.9; }
    .pricing-box .guarantee { font-size: 11px; opacity: 0.5; }

    /* Final CTA */
    .cta-section { background: ${t.ctaBg}; padding: 80px 24px; text-align: center; }
    .cta-section h2 { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .cta-section p { color: rgba(255,255,255,0.5); margin-bottom: 32px; }
    .btn-cta { display: inline-block; background: ${t.accent}; color: #fff; font-weight: 700; font-size: 18px; padding: 16px 48px; border-radius: 12px; text-decoration: none; }

    @media (max-width: 640px) {
      .hero { padding: 60px 20px; }
      .section { padding: 48px 20px; }
      .features-grid, .benefits-grid, .testimonials-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <div class="hero">
    <div class="hero-badge">${page.input?.target_audience || 'For Everyone'}</div>
    <h1>${c.headline}</h1>
    <p>${c.sub_headline}</p>
    <a href="#" class="btn-primary">${c.cta.primary}</a>
    <span class="btn-note">${c.cta.secondary}</span>
  </div>

  <div class="section container">
    <div class="section-label">About</div>
    <p>${c.description}</p>
  </div>

  <div class="section section-alt">
    <div class="container">
      <h2>Why Choose Us?</h2>
      <div class="benefits-grid">
        ${c.benefits.map(b => `
        <div class="benefit-card">
          <span class="benefit-check">✓</span>
          <p>${b}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>Key Features</h2>
      <div class="features-grid">
        ${c.features.map(f => `
        <div class="feature-card">
          <h3>${f.title}</h3>
          <p>${f.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="section section-alt">
    <div class="container">
      <h2>What Our Customers Say</h2>
      <div class="testimonials-grid">
        ${c.social_proof.map(sp => `
        <div class="testimonial">
          <div class="stars">★★★★★</div>
          <blockquote>"${sp.quote}"</blockquote>
          <div class="author">
            <strong>${sp.name}</strong>
            <span>${sp.role}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>Simple, Transparent Pricing</h2>
      <div class="pricing-box">
        <div class="price">${c.pricing.price}</div>
        <div class="billing">${c.pricing.billing}</div>
        <ul>
          ${c.pricing.includes.map(item => `<li><span>✓</span> ${item}</li>`).join('')}
        </ul>
        <div class="guarantee">${c.pricing.guarantee}</div>
      </div>
    </div>
  </div>

  <div class="cta-section">
    <h2>Ready to get started?</h2>
    <p>${c.cta.secondary}</p>
    <a href="#" class="btn-cta">${c.cta.primary}</a>
  </div>

</body>
</html>`
}
