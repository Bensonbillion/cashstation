# MyCashStation — Brand & Build Specification

> This is the definitive spec for MyCashStation. Follow it in every session.

## Project Overview

MyCashStation is a Toronto/GTA-based event vending activation business that brings portable machines to weddings, parties, festivals, and nightlife events. The machine dispenses either custom novelty printed notes (with the couple's/celebrant's face on them) or real $1 USD bills for money spraying.

**Primary cultural markets:** Nigerian, Ghanaian, Arab, and Caribbean communities in the GTA.

## Taglines

- **Short brand tagline:** TAP · VEND · CELEBRATE
- **Website hero headline:** "The celebration station your guests won't stop talking about."

## Brand Colors (Design System v2)

| Token | Variable | Hex | Usage |
|---|---|---|---|
| Primary background | `--bg-primary` | `#0D0D0D` | Near black — page background |
| Secondary background | `--bg-secondary` | `#141414` | Alternating dark sections |
| Light background | `--bg-light` | `#FAFAF7` | Alternating light sections |
| Gold bright | `--gold-bright` | `#FFD700` | Electric gold — headlines, CTAs, icons |
| Gold mid | `--gold-mid` | `#E6B800` | Hover states, gradients |
| Gold deep | `--gold-deep` | `#C4A265` | Eyebrow labels on light backgrounds |
| Body text | `--text-primary` | `#F5F2EC` | Warm off-white — never use pure white |
| Muted text | `--text-muted` | `#888880` | Captions, labels, secondary info |
| Dark text | `--text-dark` | `#1A1A1A` | Headings on light sections |
| Dark muted text | `--text-dark-muted` | `#5A5A5A` | Body text on light sections |
| Section dividers | — | — | 2px gold gradient lines |

## Typography

- **Headlines:** Playfair Display, Bold — import from Google Fonts
- **Body text:** DM Sans, Regular/Medium — import from Google Fonts
- **All-caps labels and tags:** DM Sans, letter-spacing `0.15em`
- **Never use system fonts** (Arial, Helvetica, etc.)

## Logo

- **Wordmark:** MYCASHSTATION in all-caps with a banknote icon to the left
- Always use the gold version on dark backgrounds
- Minimum clear space around logo: 24px on all sides

## Tech Stack

- Plain HTML, CSS, JavaScript — single `index.html` file
- **No frameworks, no build tools**
- All CSS in a `<style>` tag or linked `styles.css`
- All JS in a `<script>` tag or linked `script.js`
- Mobile-first responsive design — design for 390px wide first, then scale up
- Target page load under 2 seconds

## Animations & Effects

- Use `canvas-confetti` (CDN) for confetti burst on form submission — gold and black confetti (`#FFD700`, `#E6B800`, `#C4A265`, `#0D0D0D`, `#F5F2EC`)
- Subtle fade-in-up on scroll for section headings (CSS only, no heavy libraries)
- Gold shimmer CSS animation on the hero headline
- Floating WhatsApp button — bottom right, always visible on mobile
- No autoplay sound, no continuous looping animations that distract

## Page Sections (in order)

1. **Sticky nav** — logo left, "Book Now" CTA button right
2. **Hero** — full screen dark, bold headline, subheadline, dual CTA (Check Availability + WhatsApp)
3. **What is money spraying?** — brief education section for unfamiliar visitors
4. **How it works** — 3 steps: Choose your experience → We set up → Your guests celebrate
5. **Our two experiences** — Custom Notes card + Real $1 Bills card
6. **Why MyCashStation** — 4 trust/benefit icons
7. **Social proof** — testimonial placeholders (easy to replace later)
8. **Inquiry form** — 5 fields max, Tally embed OR native HTML form
9. **FAQ** — 5–6 questions in accordion style
10. **Footer** — logo, Instagram, TikTok, WhatsApp, email

## Contact Info Placeholders (replace before launch)

- **WhatsApp:** +1 (416) XXX-XXXX
- **Email:** hello@mycashstation.ca
- **Instagram:** @mycashstation
- **TikTok:** @mycashstation

## Booking Flow

- Primary CTA everywhere: "Check Availability" → scrolls to inquiry form
- Secondary CTA everywhere: WhatsApp floating button
- **Inquiry form fields:** Full Name, Phone Number, Event Date, Event Type (dropdown), Service Interest (checkboxes)
- After form submit: confetti burst + thank you message in same section (no page reload)
- Response time promise visible near form: "We reply within 2 hours"

## Tone & Copy Voice

- Warm, celebratory, culturally fluent — never corporate
- Speak directly to Nigerian, Caribbean, Arab, and Ghanaian communities
- Celebrate the tradition of money spraying — never frame it as unusual or exotic
- Short sentences, punchy copy, celebration energy

## Images

- No real event photos yet — use CSS gradient placeholders and abstract gold backgrounds
- All image containers must be clearly labeled with comments like `<!-- REPLACE: event photo -->`
- Design modularly so photos can be dropped in without layout changes

## Git Conventions

- Commit after every major section is complete
- Commit message format: `feat: add [section name] section`
- Never commit broken or untested code

---

**Always follow this spec. If anything is unclear, ask before building.**
