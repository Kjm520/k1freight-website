# Changelog

## 2026-03-05

- Added exiftool to Dockerfile: strips all image metadata and writes K1 Freight LLC copyright/ownership on every build
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
