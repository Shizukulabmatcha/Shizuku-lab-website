# Shizuku Lab Website Admin v1

Open:
- index.html — public website
- admin.html — website editor

Workflow:
1. Open admin.html through your Vercel website: /admin.html
2. Edit content and preview it live.
3. Click “Export site-data.js”.
4. Upload the downloaded site-data.js to your GitHub repository root.
5. Vercel redeploys the public website.

Included fixes:
- Our Matcha image uses contain, so the cup is not cropped.
- Origin, Harvest, Cultivar and Tasting Notes remain visible.
- Seven cultivar images are replaced with the user-cut originals.
- Admin covers Logo, Hero, Story, Our Matcha, Library cultivars, Atlas,
  Menu, three Updates, Contact and Closing.

This is a static Admin v1. It does not store customer information and does not
publish directly to GitHub. Secure login/database publishing can be added later.
