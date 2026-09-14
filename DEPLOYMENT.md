# Cloudflare Pages Deployment Walkthrough

Quick step-by-step to get wrenly.app live on Cloudflare Pages.

## 1. Create GitHub Repository

1. Go to **github.com** and log in
2. Click **+** (top right) → **New repository**
3. Fill in:
   - **Repository name**: `wrenly-site`
   - **Description**: `Wrenly marketing pages and app hub`
   - **Public** (recommended for open-source marketing site)
   - **Initialize with**: None (you'll push existing files)
4. Click **Create repository**

You'll see a screen with commands. Copy the HTTPS URL.

## 2. Push Your Files to GitHub

```bash
# From your local machine, navigate to the wrenly-site folder
cd /path/to/wrenly-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Wrenly marketing pages and app hub"

# Add remote (replace with your URL from step 1)
git remote add origin https://github.com/YOUR-USERNAME/wrenly-site.git

# Push to main branch
git branch -M main
git push -u origin main
```

**Result**: All files now on GitHub (index.html, apps/*.html, README.md, .gitignore)

## 3. Connect to Cloudflare Pages

1. Log in to **dashboard.cloudflare.com**
2. Go to **Pages** (left sidebar)
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare with GitHub (if prompted)
6. Choose your account → Find & select `wrenly-site` repo
7. Click **Begin setup**

### Build Settings
- **Project name**: `wrenly-site` (or choose custom name)
- **Production branch**: `main`
- **Framework preset**: `None`
- **Build command**: *Leave blank* (it's static HTML)
- **Build output directory**: `/` (root of repo)
- **Root directory**: *Leave blank*

8. Click **Save and Deploy**

**Result**: Cloudflare builds and deploys. You'll see a `.pages.dev` URL like `wrenly-site.pages.dev`. This is live immediately (even before domain setup).

## 4. Add Custom Domain (wrenly.app)

1. In the Cloudflare Pages deployment dashboard, scroll to **Custom domains**
2. Click **Set up a custom domain**
3. Enter `wrenly.app`
4. Choose setup method:

### Option A: Cloudflare Nameservers (Recommended)
- If your domain is already on Cloudflare: DNS is handled automatically. Done.
- If not: Cloudflare will show nameservers to add at your registrar.

### Option B: CNAME Record (If using external DNS)
- Registrar: Add CNAME record:
  ```
  Name: wrenly
  Type: CNAME
  Value: wrenly-site.pages.dev
  ```

5. Wait for DNS propagation (5 mins to 24 hours)
6. Once verified, Cloudflare shows ✓ status

**Result**: `wrenly.app` points to Cloudflare Pages. SSL certificate auto-provisioned.

## 5. Verify Deployment

- Visit **https://wrenly.app** in your browser
- Check:
  - Page loads
  - Logo & nav display
  - App catalog visible
  - Links to app pages work (e.g., `/apps/landscape-mate.html`)
  - Mobile responsive (test on phone or browser dev tools)
  - SSL lock icon shows (green padlock)

## 6. Ongoing Updates

Every time you push to the `main` branch on GitHub:

```bash
git add .
git commit -m "Update: [describe changes]"
git push
```

Cloudflare automatically rebuilds and redeploys within seconds. No manual steps needed.

## Troubleshooting

### Site shows 404
- **Cause**: DNS not yet propagated
- **Fix**: Wait 5-30 mins, try incognito browser, clear cache, or check DNS status at https://dnschecker.org

### Pages showing `.pages.dev` URL instead of custom domain
- **Cause**: Custom domain setup incomplete
- **Fix**: Go back to Cloudflare Pages → Custom domains → Verify CNAME/NS records are correct at registrar

### CSS or images not loading
- **Cause**: File paths wrong or missing
- **Fix**: All CSS is inline in HTML files; no separate stylesheets. All images are SVG or data URIs. Check browser console for errors.

### SSL certificate not issued
- **Cause**: DNS not fully propagated
- **Fix**: Wait up to 24 hrs. Cloudflare issues SSL automatically once DNS is live.

## Next: Deploy Floot Apps

Once marketing pages are live:

1. Create Floot projects for Landscape Mate, FlowArt, Dadvance
2. Add "Open App" buttons or links on marketing pages
3. Consider single sign-on (Floot can integrate auth)
4. Monitor analytics (Cloudflare Pages provides traffic data)

## Rollback / Disaster Recovery

If something breaks:

1. Identify the bad commit
2. ```bash
   git revert [commit-hash]
   git push
   ```
3. Cloudflare redeploys the reverted version within seconds

Git history is your backup — all commits are retained.

---

**Questions?**
- Cloudflare Support: https://support.cloudflare.com/
- GitHub Help: https://docs.github.com/
