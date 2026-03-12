# Branding Guide for Email Templates

To keep the message consistent with the site you've built, pull directly from the same design tokens that power the Tailwind utilities. Here's what the app uses, which you can translate into inline-CSS for an email client:

---

## ?? Core colour palette

| Name              | HEX      | Usage examples |
|------------------|----------|----------------|
| **brand-charcoal** | `#1A1A1A` | body text, dark backgrounds, headings |
| **brand-gold**     | `#C5A059` | buttons, links, highlights, borders |
| **brand-white**    | `#FFFFFF` | page background, text on gold/charcoal |

> In CSS variables they live as `--color-brand-charcoal`, etc.  
> Use `rgba()` variants (e.g. `#C5A0591A` ˜ 10 % gold) for overlays.

---

## ?? Typography

- **Sans-serif (body)** – *Inter* (fallbacks: `system-ui, sans-serif`).
- **Serif (headings/brand name/quotes)** – *Playfair Display* (fallbacks: `serif`).
- Small caps/upper-case labels are common: e.g. `text-transform: uppercase; letter-spacing: .2em; font-size: 10px;`.

Example rules you can inline:

``css
body { font-family: 'Inter', system-ui, sans-serif; color: #1A1A1A; }
h1,h2,h3,h4 { font-family: 'Playfair Display', serif; margin:0; }
a { color: #C5A059; text-decoration: none; }
button, .btn { background: #C5A059; color: #1A1A1A; border: 1px solid #C5A059; }
``

---

## ?? Spacing & layout hints

- Sections on the site use `py-24 px-6 lg:px-12` ? roughly `padding: 3rem 1.5rem` (condense for email).
- Buttons are `px-12 py-5` with tight `tracking-[0.2em]` – use `padding: 0.75rem 3rem; letter-spacing: .2em; font-weight: 700; text-transform: uppercase;`
- Borders and separators often use `1px` lines in `#C5A059/40` (˜ `rgba(197,160,89,.4)`).

---

## ??? Graphic accents

- Gold shadows: `box-shadow: 0 4px 30px rgba(197,160,89,0.3);` (for emphasis on buttons/cards).
- Subtle gradients: `linear-gradient(to top, #1A1A1A 0%, #1A1A1A20 50%, transparent 100%);`.

---

## ? Putting it together

1. **Set the `<body>`** background to `#FFFFFF`, font to Inter, color to `#1A1A1A`.
2. **Headings** use Playfair, dark charcoal.
3. **Accent links/buttons** in the gold shade with charcoal text.
4. **Keep text small and spaced** similarly to the site (tight tracking on uppercase labels, comfortable line-height for paragraphs).
5. **Inline all styles** (email clients hate external CSS) but you can still reference the above tokens.

These values will ensure the email feels like "The Jenkins Group" website and can be dropped into your mailer templates with confidence.
