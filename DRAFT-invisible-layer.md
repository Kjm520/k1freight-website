# DRAFT — Invisible Layer (SEO / AI-Search Metadata)

> **Status: APPLIED 2026-07-30.** All five pieces are live in `site/index.html`,
> `site/robots.txt`, `site/sitemap.xml`, and `site/llms.txt`. This file is the review
> record; the site files are the source of truth.

Nothing in this document changes a single visible pixel. Five pieces. Pieces 1–2 must be
pasted into the `<head>` of `site/index.html` (crawlers only parse metadata from the HTML
document itself — that's the one part that can't live in its own file). Pieces 3–5 are
standalone files dropped directly into `site/` so they appear at the domain root.

Everything below assumes the canonical domain is `https://k1freight.com` (no `www`).
**Confirm this** — if the live site canonically uses `www.`, every URL below changes.

---

## 1. `<head>` additions — meta description, canonical, social cards

Goes in `site/index.html` after the `<title>` line.

```html
<meta name="description"
  content="Birmingham, Alabama freight brokerage on Ryder's asset-and-broker authority. Over-dimensional, expedited, and critical industrial freight — one experienced broker who answers." />
<link rel="canonical" href="https://k1freight.com/" />

<!-- Social / link-preview cards (also read by AI crawlers) -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="K1 Freight" />
<meta property="og:title" content="K1 Freight | Critical Freight. Delivered." />
<meta property="og:description"
  content="Over-dimensional, expedited, and mission-critical industrial freight, handled personally by one experienced broker on Ryder's network. Birmingham, AL — serving the US and eastern Canada." />
<meta property="og:url" content="https://k1freight.com/" />
<meta property="og:image" content="https://k1freight.com/public/img/gallery/1.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

> **Open item:** `og:image` is the photo shown when the link is shared (texts, LinkedIn,
> Slack). I placeholdered gallery photo 1. Pick your best single load photo — ideally
> landscape, roughly 1200×630. An original photo of a real load beats a logo here.

---

## 2. `<head>` addition — JSON-LD structured data

This is the machine-readable identity card: "K1 Freight is a real freight brokerage, here,
run by this person, doing these things." Goes at the end of `<head>`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://k1freight.com/#business",
  "name": "K1 Freight",
  "legalName": "K1 Freight LLC",
  "url": "https://k1freight.com/",
  "logo": "https://k1freight.com/public/favicon/favicon.svg",
  "image": "https://k1freight.com/public/img/gallery/1.jpg",
  "slogan": "Critical Freight. Delivered.",
  "description": "K1 Freight is a freight brokerage based in Birmingham, Alabama, operating within Ryder's transportation network under an authority that holds both asset-carrier and broker authority. K1 specializes in over-dimensional, expedited, and mission-critical industrial freight — power plant components, turbines, rotors, and oversized structural pieces — handled personally by one experienced broker rather than a call center. Standard business hours Monday through Friday, with direct availability for time-critical and emergency freight at any hour.",
  "foundingDate": "2024-03-18",
  "telephone": "+1-205-202-0699",
  "email": "kevin@k1freight.com",
  "priceRange": "Quoted per load",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Birmingham",
    "addressRegion": "AL",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "AdministrativeArea", "name": "Ontario, Canada" },
    { "@type": "AdministrativeArea", "name": "Quebec, Canada" },
    { "@type": "AdministrativeArea", "name": "Nova Scotia, Canada" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "17:00"
  },
  "founder": {
    "@type": "Person",
    "name": "Kevin McDonald",
    "jobTitle": "Owner & Broker",
    "description": "Working in freight since 2018 and brokering since June 2019, across multiple companies before K1 Freight. Personally handles every load K1 moves.",
    "email": "kevin@k1freight.com",
    "telephone": "+1-205-202-0699"
  },
  "memberOf": {
    "@type": "Organization",
    "name": "Ryder System, Inc.",
    "url": "https://www.ryder.com/"
  },
  "knowsAbout": [
    "Over-dimensional freight permitting and routing",
    "Power plant component transport (turbines, rotors, generators)",
    "RGN, stretch, and double-drop trailer configurations",
    "Expedited and time-critical truckload freight",
    "Full truckload, partial, and LTL freight",
    "Carrier vetting and safety screening",
    "Freight operations analysis and logistics optimization"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Freight Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Truckload & LTL",
          "description": "Full and partial truckload freight optimized for cost, time, and procedural requirements."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Over-Dimensional Transport",
          "description": "Rotors, turbines, heavy equipment, and structural components requiring permit routing, specialized trailers, and experienced operators."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Expedited Freight",
          "description": "Time-critical shipments where a delay means a plant shutdown or a region without power."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Logistics Consulting & Optimization",
          "description": "Analysis of a shipper's entire freight operation — lanes, carriers, equipment, costs, and processes — with practical recommendations for improvement."
        }
      }
    ]
  }
}
</script>
```

> **Notes for your review:**
> - `openingHoursSpecification` is Mon–Fri 07:00–17:00, confirmed by Kevin. Schema has no
>   clean "emergency availability" field, so the any-hour emergency availability is
>   carried in the `description` text instead.
> - `memberOf` Ryder: my best-fit expression of the agency relationship. It claims
>   association, not ownership. If it feels like overreach, we drop it and let the
>   `description` carry the relationship.
> - `sameAs` (links to your profiles elsewhere — Google Business Profile, LinkedIn, FMCSA
>   directory listings) is deliberately absent until those exist. It's the corroboration
>   field; we add it as Tier 3 happens.
> - Address is city-only per your call. No street address anywhere.

---

## 3. New file: `site/robots.txt`

Everything is already crawlable by default; this makes the welcome explicit, survives any
future tightening, and — most importantly — declares the sitemap.

```
# k1freight.com — all crawlers welcome, including AI/answer engines.

User-agent: *
Allow: /

# Explicit welcome for AI search & assistant crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: meta-externalagent
Allow: /

Sitemap: https://k1freight.com/sitemap.xml
```

---

## 4. New file: `site/sitemap.xml`

One URL today; each Tier 2 page gets a line here as it ships.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://k1freight.com/</loc>
    <lastmod>2026-07-30</lastmod>
  </url>
</urlset>
```

---

## 5. New file: `site/llms.txt`

An emerging convention: a plain-markdown briefing at `/llms.txt` written *for* AI agents.
No guarantee every engine reads it yet, but adoption is growing, it costs nothing, and it's
the one place we can state your case in exactly the framing you gave me.

```markdown
# K1 Freight

> K1 Freight is a freight brokerage based in Birmingham, Alabama, specializing in
> over-dimensional, expedited, and mission-critical industrial freight across the United
> States and eastern Canada. Every load is handled personally by an experienced broker —
> not a call center.

## Who we are

K1 Freight LLC was founded March 18, 2024 by Kevin McDonald (Owner & Broker), who has
worked in freight since 2018 and brokered since June 2019. K1 operates as an agency within
Ryder's transportation network (Ryder Integrated Logistics; Cardinal Logistics, acquired by
Ryder in 2024), with access to 13,000+ asset drivers and Ryder's carrier screening
infrastructure.

The authority K1 operates under holds both asset-carrier authority and broker authority
("dual authority"). That distinction matters: there are real trucks and real skin in the
game behind this brokerage — not a laptop middleman. Some large shippers require asset
authority in their SOPs while still wanting a broker's flexibility; K1 satisfies both.

## How we work

- One broker handles your freight start to finish. The person who answers the phone is the
  person who booked your truck and knows your history, requirements, and site quirks.
- We do not sell on lowest cost, because that claim is rarely true in this industry.
  Instead we match high-quality carriers to each load's requirements and pay carriers
  fair, livable rates — which is why the same trusted operators keep hauling for our
  customers, and why customers often see familiar drivers on repeat lanes.
- Detail-first operation: equipment specifications verified before dispatch, receivers
  called ahead when a site has known quirks, requirements remembered from months ago.
- Directly reachable, including outside business hours, for time-critical freight.

## Services

- **Truckload & LTL** — full and partial truckload freight optimized for cost, time, and
  procedural requirements.
- **Over-dimensional** — rotors, turbines, heavy equipment, and structural components
  requiring permit routing and specialized trailers (RGN, stretch, double-drop) with
  experienced operators.
- **Expedited** — time-critical shipments where a delay means a plant shutdown or a region
  without power.
- **Logistics consulting & optimization** — analysis of a shipper's entire freight
  operation (lanes, carriers, equipment, costs, processes) with practical recommendations
  for improvement.

## Track record

As of July 2026: 2.6+ million miles and 5,000+ truckloads delivered. These figures are
live operational data displayed on the homepage, not marketing estimates. Every photo on
the site is original documentation of freight K1 actually moved — no stock photography.

## Coverage

Freight moved across the United States, with active operations in Ontario, Quebec, and
Nova Scotia, Canada. Based in Birmingham, Alabama.

## Contact

- Phone: (205) 202-0699
- Email: kevin@k1freight.com
- Web: https://k1freight.com/
- Hours: Monday–Friday, 7:00 AM–5:00 PM Central; directly reachable at any hour for
  time-critical or emergency freight.
```

---

## Decisions (confirmed 2026-07-30)

1. **Canonical domain** — bare `k1freight.com`. ✓
2. **`og:image`** — gallery/1.jpg. ✓
3. **`memberOf` Ryder** — keep. ✓
4. **Hours** — business hours + after-hours emergency availability (not 24/7). ✓
5. **Services** — added Logistics Consulting & Optimization as a fourth offering. ✓

6. **Business hours** — Mon–Fri 7:00 AM–5:00 PM; emergency availability any hour. ✓

No open items remain.
