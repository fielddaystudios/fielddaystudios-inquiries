# Field Day Studios — Website

A personal consulting website for Eli Harvey / Field Day Studios.
Built with HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages.

---

## File Structure

```
fieldday/
├── index.html          ← Homepage
├── about.html          ← About & experience
├── services.html       ← Services & process
├── work.html           ← Case studies & testimonials
├── contact.html        ← Contact form
├── css/
│   └── styles.css      ← All styles
├── js/
│   └── main.js         ← Navigation, scroll effects
└── google-apps-script.js  ← Paste this into Google Apps Script (see below)
```

---

## Part 1: Set Up the Contact Form (Google Apps Script)

This connects your contact form to a Google Sheet and handles both
the notification email to you and the auto-reply to the person who submitted.

### Step 1 — Create a new Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it something like "Field Day Studios — Inquiries"

### Step 2 — Open the Script Editor
1. Inside that Sheet, click **Extensions > Apps Script**
2. Delete any code that's already there

### Step 3 — Paste the script
1. Open `google-apps-script.js` from this folder
2. Copy the entire contents and paste it into the Apps Script editor
3. Update these three lines at the top if needed:
   ```
   const YOUR_EMAIL  = 'eli@fielddaystudios.com';
   const YOUR_NAME   = 'Eli Harvey';
   const SHEET_NAME  = 'Inquiries';
   ```
4. Click **Save** (Ctrl+S / Cmd+S)

### Step 4 — Deploy as a Web App
1. Click **Deploy > New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Set these options:
   - Description: `Field Day Contact Form`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. When prompted, click **Authorize access** and follow the steps
6. **Copy the Web App URL** — it will look like:
   `https://script.google.com/macros/s/XXXXXXXXXX/exec`

### Step 5 — Add the URL to your website
1. Open `contact.html`
2. Find this line near the bottom:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied
4. Save the file

### Step 6 — Test it
1. Open `contact.html` in your browser
2. Fill out and submit the form
3. Check that:
   - A row appears in your Google Sheet
   - You receive a notification email
   - The person receives an auto-reply

---

## Part 2: Host on GitHub Pages

### Step 1 — Create a GitHub account
If you don't have one, go to [github.com](https://github.com) and sign up.

### Step 2 — Create a new repository
1. Click the **+** icon in the top right > **New repository**
2. Name it `fieldday-studios` (or anything you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. On the repository page, click **uploading an existing file**
2. Drag and drop ALL your files — including the `css/` and `js/` folders
3. Make sure the folder structure is preserved:
   - `index.html` should be at the root level
   - `css/styles.css` should be inside a `css` folder
   - `js/main.js` should be inside a `js` folder
4. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Click **Settings** on your repository
2. Click **Pages** in the left sidebar
3. Under "Source", select **Deploy from a branch**
4. Select the **main** branch and **/ (root)** folder
5. Click **Save**

### Step 5 — Your site is live
Within a minute or two, your site will be available at:
`https://yourusername.github.io/fieldday-studios/`

GitHub will show you the exact URL in the Pages settings.

---

## Part 3: Connect a Custom Domain (Optional)

If you buy a domain like `fielddaystudios.com`:

1. In your domain registrar (Namecheap, Google Domains, etc.),
   add these DNS records:
   ```
   Type: A    Name: @    Value: 185.199.108.153
   Type: A    Name: @    Value: 185.199.109.153
   Type: A    Name: @    Value: 185.199.110.153
   Type: A    Name: @    Value: 185.199.111.153
   Type: CNAME  Name: www  Value: yourusername.github.io
   ```
2. In GitHub Pages settings, enter your custom domain
3. Check "Enforce HTTPS"
4. DNS changes can take up to 24 hours to propagate

---

## Making Updates

To update content on your site:
1. Edit the HTML files on your computer
2. Go to your GitHub repository
3. Click the file you want to update
4. Click the pencil (edit) icon
5. Paste your updated content
6. Click **Commit changes**

The site will update automatically within a minute.

---

## Replacing Placeholder Content

Search for `[` in any file to find all placeholder text.
Every section with brackets is waiting for your real content.

Key things to fill in:
- Your hero headline and body copy (index.html)
- Your bio and story (about.html)
- Your actual services and deliverables (services.html)
- Real case studies (work.html)
- Real testimonials (index.html, work.html)
- LinkedIn URL (all pages — search for `linkedin.com/in/eliharvey`)
- The quote in the contact page sidebar (contact.html)
