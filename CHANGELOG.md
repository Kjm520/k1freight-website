# Changelog

## 2026-09-02

- Added !aux/speedtest-noise-20000.svg: a 20000×20000 canvas of four summed feTurbulence layers that rasterizes to an incompressible PNG (measured 3.005 bytes/px as RGB, 1.202 GB at 20000 px, 47 s via Inkscape 1.4 CLI) for network speed-test payloads. Companion !aux/export-noise-png.ps1 wraps the Inkscape export with a -Width parameter and size table, and swaps in clock-derived feTurbulence seeds via a temp copy on every run so each PNG is unique (default filename carries the seed so runs never overwrite)
- Search Console follow-up: 1 indexed / 8 not indexed is correct for a one-page site. 3 redirects are the http and www variants (verified live), the 403 is nginx's directory-without-index response, and the 4 404s (/scrap/, /author/k1freight/, /author/kevin3c30c39056/, /contact/) are leftovers of the pre-2026 WordPress.com site confirmed via Wayback captures. No site changes; left to age out
- DNS audit of k1freight.com (no changes made): both Dynadot nameservers, 8.8.8.8 and 1.1.1.1 agree; SOA serial unchanged since the 07/30 fix. Apex A/AAAA = Cloud Run's four Google frontends, www CNAME → apex with valid Google-managed certs on both hosts, MX smtp.google.com, SPF 1 of 10 lookups, DMARC p=reject strict, 2048-bit DKIM published. The mail CNAME → ghs.googlehosted.com turned out to be the Gmail Custom URL shortcut Google's Admin console asks for (HTTP-only by design, no role in delivery). Kevin deleted the CNAME at Dynadot and reverted the Custom URL to default; Verified fully propagated the same afternoon: both Dynadot nameservers, 8.8.8.8, 1.1.1.1, and Google's frontend (now 404 for the hostname) all clear. Optional CAA/DNSSEC/HSTS noted in TODO
- DKIM retirement note: a test message sent 2026-09-02 from kevin@k1freight.com carries DKIM-Signature d=k1freight.com s=google, and the receiving Gmail reports dkim=pass, spf=pass, dmarc=pass (p=REJECT). Google's fallback signing via gappssmtp.com (in effect ~Nov 2025 to 2026-07-30) is confirmed over. Removed the verification item from TODO
- Gmail signature updated by Kevin: K1 link and Ryder logo image now use bare k1freight.com instead of www (no redirect hop). Verified in a second test message: both URLs correct, UTM parameters and link styling intact, auth still dkim/spf/dmarc pass
- Added *.eml to .gitignore so saved message files (headers include personal addresses) never get committed
- Added /!scrap to .gitignore (trash-bin folder was untracked by convention but not ignored) and untracked the one file under it with git rm --cached; file remains on disk

## 2026-07-30

- Added DRAFT-invisible-layer.md — proposed SEO/AI-search metadata layer (meta tags, JSON-LD, robots.txt, sitemap.xml, llms.txt) for review; no site files changed yet
- Draft revised per Kevin's review: business hours + after-hours emergency availability (was 24/7), added Logistics Consulting & Optimization as fourth service; canonical bare domain, gallery/1.jpg og:image, and memberOf Ryder confirmed
- Applied the invisible layer: meta description, canonical, Open Graph/Twitter tags, and LocalBusiness JSON-LD added to site/index.html head; created site/robots.txt (AI-crawler welcome + sitemap declaration), site/sitemap.xml, and site/llms.txt. Hours: Mon–Fri 7:00–17:00, emergency any hour. JSON-LD validated as parseable JSON
- Added priceRange "Quoted per load" to JSON-LD after Rich Results Test flagged the empty recommended field (address/zip warnings intentionally left — city-only policy)
- llms.txt revised per Kevin: dual-authority paragraph now says "a real trucking company behind this brokerage" (not "real trucks"/"skin in the game"); summary and How-we-work gained standard-freight framing (move standard freight daily, specialize in critical, adapt when lowest cost is the priority); "same experienced team" replaces "an experienced broker" in the summary
- Added sameAs to JSON-LD linking the Google Business Profile: Maps share link + stable CID URL (cid=7786980377244906296, verified resolving); closes the site↔profile corroboration loop
- Dockerfile nginx config: www.k1freight.com now 301-redirects to the bare canonical domain (new server block); existing catch-all marked default_server so bare domain, run.app URL, and health checks serve normally. DNS www CNAME and Cloud Run www domain mapping unchanged — both required for the redirect to be reachable
- Added LinkedIn company page (linkedin.com/company/k1freight) to JSON-LD sameAs alongside the two Maps URLs

## 2026-06-18

- Fixed gallery images that rendered rotated (EXIF orientation): baked rotation into pixels for 10, 59 (180°) and 78, 84, 99, 134 (90°), then stripped all EXIF from the 142 source gallery files that still carried metadata. Source files now have no orientation flag, so they render correctly regardless of browser/CSS or the Dockerfile's build-time exiftool strip.

## 2026-04-30

- Added page-load ping to `feedback.k1apps.dev` for usage tracking

## 2026-03-17

- Added fallback static values (2,567,861 miles / 4,852 truckloads) to stat counters — shown if Google Sheets fetch fails or returns invalid data

## 2026-03-05

- Added exiftool to Dockerfile via multi-stage build: strips all image metadata and writes K1 Freight LLC copyright/ownership on every build; Perl/exiftool excluded from final image
- Cleaned up .gitignore (removed Next.js/Vercel boilerplate, added .claude/)
- Updated .dockerignore (added .claude/, *.pem, .env*, doc files)

## 2026-03-04

- Fixed image paths after img/ directory restructure (logos moved to subdirs, services images missing leading slash)
- Created site/public/static/ directory convention for externally-referenced assets (email signature images)
- Added site/public/static/README.txt documenting do-not-move convention
- Mobile responsive fixes: hero padding, stat bar 2-column grid, overflow-x hidden on html element
- Hidden hero-actions on mobile
- Moved stat bar out of absolute overlay into normal block flow below hero section
- Wrapped hero section + stat bar in .hero-wrapper (min-height: 100vh, flex column) so stat bar is visible on first load without scrolling
- Added mobile overrides for all section padding (100-120px → 60px) and heatmap map height (820px → 300px)

## 2026-02-20

- Added Successful Miles animated counter as 3rd hero stat box
- Consolidated miles and truckload counters into single Google Sheets fetch for synchronized animation
- Reordered hero stat bar: Ryder Integrated Logistics → Successful Miles → Successful Truckloads → Vetted Network Carriers
- Replaced OD stat card with 108K+ Vetted Network Carriers
- Updated Ryder stat card from "13K+ Asset Drivers" to "Ryder Integrated Logistics / A Ryder System Inc. company"
- Added animated count-up to 108K+ carrier card
- Added US heatmap section (Google Charts GeoChart) showing load distribution by state
- Applied logarithmic then capped (maxValue: 300) color scale to heatmap for better visual distribution
- Map background color matched to site --panel color for seamless integration
- Moved heatmap section between gallery ticker and Who We Are
- Added Coverage link to global nav and footer, reordered both to match page scroll order
- Moved Infrastructure & Trust (partner cards) into Who We Are section
- Removed standalone Infrastructure & Trust section
- Updated footer links to match header nav links
- Updated footer logo color from grey to white to match header
- Reduced footer height to match header bar (72px)
- Vertically centered hero content to prevent stat bar overlap at narrow viewports
- Applied clamp() font scaling to stat-num to prevent 3-line wrap on Ryder card
- Added Gallery section-label above "The Work We Do." heading
- Increased gallery ticker image size ~10% (380×250 → 418×275)
- Reduced ticker scroll speed ~20% total
- Added consistent bottom padding and border to gallery section
- Added border-top to positioning section for page break after Coverage
- Updated Coverage section background to var(--panel) to match alternating section shading
- Added favicon set (ico, svg, png, apple-touch-icon, webmanifest) to site/public/favicon/
- Updated site.webmanifest paths and theme colors from WordPress to production paths
- Added favicon link tags to document head
- Updated "Where We've Delivered" heading to "Where We Operate"
- Updated stat label "Vetted Carrier Network" to "Vetted Network Carriers"
