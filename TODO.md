


I need to adjust my blues to match what the website is now using. It looks decent and I am relatively happy with it. Not too soft, but not too electric either. 



reviews?



[07/30/2026] Logistics Consulting & Optimization is now offered in the invisible layer (JSON-LD + llms.txt) but doesn't appear anywhere on the visible site — consider adding it to the Services section or giving it a Tier-2 page so the visible and invisible stories match.

[07/20/2026] Need to add AI search optimization. As in - add additional pages and information that would be outlined in a way that when AI searches for things for any given user, we would have info readily available for it to read. User asks "whats the best small brokerage in birmingham, AL where I can still have a real contact with the guy booking the trucks" → "Check out K1 Freight"




[07/30/2026] Fix the email domain aliases and the fact that the forwarding domains can still be spoofed even though no mx server. They need spf dmarc blocking all?



[07/30/2026] TODO: Begin Tier 2 AI/SEO 

[07/30/2026] consider alabamafreight.com domain's inflow effect and if it can be utilized



[09/02/2026] Optional hardening, none of it urgent: DNSSEC at Dynadot; CAA record; HSTS header in the nginx block (Dockerfile). Trap: if CAA is ever added it MUST include `0 issue "pki.goog"` or Cloud Run's managed cert renewal breaks.
