# Wrenly — Marketing Pages & App Hub

Static marketing website for Wrenly, built with semantic HTML, CSS custom properties, and embedded assets. Deployed on **Cloudflare Pages** via GitHub.

## Structure

```
wrenly-site/
├── index.html           # Main hub page with app catalog & brand story
├── apps/                # Individual app marketing pages
│   ├── landscape-mate.html    # Landscape Mate (site tools, job mgmt)
│   ├── flowart.html           # FlowArt (irrigation design & quoting)
│   ├── buildmate.html         # BuildMate (trades reference guide)
│   └── fixmate.html           # FixMate (home troubleshooting)
├── README.md            # This file
├── .gitignore           # Git exclusions
└── DEPLOYMENT.md        # Setup & deployment guide
```

## Design System

All pages use the **Wrenly brand identity**:

- **Primary Color**: Teal `#2673B7` (--wren: `#2E7ED3`)
- **Accent Color**: Coral `#FF6633`
- **Typography**: 
  - Headings: Playfair Display (800 weight)
  - Body: Archivo (variable, wdth & wght)
- **CSS Custom Properties**: `--ink`, `--tier`, `--edge`, `--chalk`, `--haze`, `--wren`, `--wren-lift`, `--wattle`, `--pad`, `--measure`

Each app page reuses the landscape-mate.html template, changing only:
- Accent color tokens
- Content (problem sections, modules, deep-dive process, FAQ)
- App-specific branding

## File Details

### index.html (Main Hub)
- App catalog with 16 apps (Landscape Mate, FlowArt, FixMate, BuildMate, MOD One, Compliance Hub, etc.)
- Category filtering (Tags: Site Work, Design, Reference, Home, Fleet)
- Brand methodology section
- CTA section
- Sticky masthead with navigation

### apps/landscape-mate.html (Template Reference)
- Hero section with problem statement
- Six feature modules (On-site measuring, Materials & specs, Council/compliance, Site analysis, Running the job, Client side)
- Deep dive: 5-step site analysis process
- FAQ (using `<details>` elements)
- Related apps section
- Responsive design (mobile breakpoint: 900px)

### apps/flowart.html
- Accent: `#22A7CE` (irrigation-themed blue)
- Six modules: Flow/pressure testing, Measure & survey, Services/assets, Design suite, Materials/ordering, Quoting/safety
- Deep dive: 5-step design process
- Target: Landscape irrigation professionals

### apps/buildmate.html
- Accent: `#E5A72B` (golden)
- Twelve trade modules organized in categories (Site/structure, Envelope, Services, Finishing)
- Build sequence: 5-stage construction process
- Target: Apprentices, owner-builders, tradies

### apps/fixmate.html
- Accent: `#E07B39` (orange)
- Six areas (Plumbing, Electrical, Doors/windows/locks, Walls/ceilings/floors, Appliances, Outside)
- Diagnostic flow: describe → answer questions → determine whose job → follow steps
- Target: First-time homeowners, renters, no-trade background

## Deployment: Cloudflare Pages

### Prerequisites
- GitHub account
- Cloudflare account (free tier works)
- Domain (e.g., wrenly.app)

### Setup Steps

1. **Create GitHub Repository**
   ```bash
   # On github.com, create new repo: wrenly-site (public)
   # Clone it locally
   git clone https://github.com/YOUR-USERNAME/wrenly-site.git
   cd wrenly-site
   ```

2. **Push Files**
   ```bash
   # Copy all files from this directory into the repo
   git add .
   git commit -m "Initial commit: Wrenly marketing pages"
   git push -u origin main
   ```

3. **Connect to Cloudflare Pages**
   - Log in to Cloudflare dashboard
   - Go to **Pages** → **Create a project**
   - Select **Connect to Git** → Choose GitHub repo `wrenly-site`
   - Build settings:
     - **Framework**: None
     - **Build command**: (leave blank)
     - **Build output directory**: `/`
   - Click **Save and Deploy**

4. **Configure Custom Domain**
   - In Cloudflare Pages deployment, go to **Custom domains**
   - Add `wrenly.app`
   - In your domain registrar, point `wrenly.app` nameservers to Cloudflare (or add CNAME if using Cloudflare for DNS)
   - Wait for DNS propagation (~5 min to 24 hrs)

5. **Verify SSL**
   - Cloudflare automatically provisions SSL certificate
   - Pages deployment shows status on dashboard

### Adding New Pages

1. Create new HTML file in `apps/` folder
2. Match the template structure (hero, modules, deep-dive, FAQ, related apps)
3. Update accent color tokens for app branding
4. Update `index.html` app catalog to link the new page
5. Commit and push — Cloudflare redeploys automatically

## Asset Handling

**All assets are embedded**:
- SVG logos & icons: inline in HTML
- Fonts: Google Fonts (preconnect for performance)
- Images: Data URIs or inline SVG
- No external dependencies beyond Google Fonts API

This ensures:
- Fast load times (no separate asset requests)
- Portable files (no broken asset links)
- Easy version control (everything in git)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- CSS Grid, Flexbox, CSS custom properties
- CSS `:focus-visible` for keyboard navigation

## Maintenance

### Regular Tasks
- Monitor Cloudflare Pages dashboard for deployment status
- Check SSL certificate status (auto-renewed by Cloudflare)
- Update app descriptions as features change

### Before Adding to App Stores
- Ensure Floot app backends are ready (database, auth, payments)
- Add app store links (App Store, Google Play) to app pages
- Create privacy policy & terms of service pages
- Test all links on production domain

## Floot Integration (Next Phase)

Once Cloudflare Pages is live, deploy app backends to Floot:

1. **Create Floot Projects**:
   - Landscape Mate (with job management, client portal)
   - FlowArt (with irrigation design suite, quoting)
   - Dadvance (new fathers app)

2. **Database & Auth**:
   - Use Floot's managed Postgres
   - Firebase Auth or custom auth
   - Stripe payments (if applicable)

3. **Link from Marketing Pages**:
   - Add "Open App" buttons linking to Floot deployment
   - Consider deep linking (app login redirect)

4. **Export Verification** (Before Production):
   - Test code export on throwaway Floot project
   - Verify you own all exported code/data
   - Document export & self-hosting process

## Questions?

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **GitHub for Git Help**: https://docs.github.com/
- **Floot Docs**: https://floot.com/docs

---

Built for Wrenly by Stephen Rosenbladh.
