# Hamilton Masjid PWA — Complete Setup Guide
## Version 1.0 | Feb 2026

---

## 📁 FILES IN THIS PACKAGE

```
hamilton-masjid-app/
├── index.html       ← The entire app (all code in one file)
├── manifest.json    ← Makes it installable as an app
├── sw.js            ← Service worker (offline + notifications)
├── icons/           ← You need to create this folder
│   ├── icon-192.png ← App icon (192×192px)
│   └── icon-512.png ← App icon (512×512px)
└── SETUP_GUIDE.md   ← This file
```

---

## 🚀 STEP 1: HOST ON GITHUB PAGES (FREE)

### 1a. Create a GitHub account
Go to github.com and sign up (free).

### 1b. Create a new repository
- Click the "+" button → "New repository"
- Name it: `hamilton-masjid`
- Set to: **Public**
- Click "Create repository"

### 1c. Upload your files
- Click "uploading an existing file"
- Drag ALL files (index.html, manifest.json, sw.js) into the box
- Also create an `icons` folder and upload your icons
- Click "Commit changes"

### 1d. Enable GitHub Pages
- Go to Settings → Pages
- Source: Deploy from a branch
- Branch: main → / (root)
- Click Save

### 1e. Your app URL
After 2–3 minutes your app will be live at:
`https://YOUR-USERNAME.github.io/hamilton-masjid/`

Share this URL with the community!

---

## 🎨 STEP 2: CREATE APP ICONS

You need two PNG icons. Easiest way:

### Option A — Canva (Free)
1. Go to canva.com
2. Create a design 512×512px
3. Design your mosque icon with dark background (#0d0d1a) and gold crescent
4. Download as PNG
5. Save as `icon-512.png`
6. Resize to 192×192 and save as `icon-192.png`

### Option B — Use a simple emoji icon generator
Go to: https://favicon.io/emoji-favicons/mosque/
Download and rename the files to icon-192.png and icon-512.png

---

## 🔔 STEP 3: SET UP PUSH NOTIFICATIONS (OneSignal — FREE)

OneSignal sends prayer time notifications to all users who enable it.

### 3a. Create OneSignal account
1. Go to onesignal.com and sign up (free)
2. Click "New App/Website"
3. Name: "Hamilton Masjid"
4. Select: Web Push
5. Enter your GitHub Pages URL

### 3b. Get your App ID
After setup, OneSignal gives you an App ID (looks like: abc123-def456-...)

### 3c. Add OneSignal to index.html
In index.html, find this commented section near the top:
```html
<!-- OneSignal Push Notifications — replace YOUR_APP_ID below -->
<!-- <script src="https://cdn.onesignal.com/...
```

Remove the `<!--` and `-->` comment markers, then replace `YOUR_ONESIGNAL_APP_ID` with your actual App ID.

### 3d. Schedule prayer notifications
In OneSignal dashboard:
- Go to "Messages" → "New Push"
- Schedule daily messages for each prayer time
- Title: "🌙 Maghrib / Iftar"
- Body: "Iftar time is now — 8:07 PM"
- Schedule: Daily at the prayer time

### Cost: FREE (OneSignal free tier supports unlimited web push)

---

## 📅 STEP 4: UPDATE PRAYER TIMES FOR NEW MONTHS

When you receive the new monthly PDF from WMA:

### Option A — Manual Update (Easiest)
1. Open `index.html` in any text editor (Notepad, TextEdit)
2. Find the data section: `const FEB_DATA = [` or `const MAR_DATA = [`
3. Copy the format and add new month data
4. Upload the updated file to GitHub
5. The app updates automatically for all users

### Option B — Use AI to help (Fastest)
1. Screenshot or copy the PDF prayer times table
2. Paste into Claude/ChatGPT and say:
   "Convert this prayer times table into the JavaScript array format matching this structure: {date, day, fajr, fajrIq, dhuhr, dhuhrIq, asr, asrIq, magh, maghIq, isha, ishaIq, shuruq, ramadan, suhoor, iftar}"
3. Paste the output into index.html
4. Upload to GitHub

### Adding a new month (e.g., April):
In index.html, after `const MAR_DATA = [...]`, add:
```javascript
const APR_DATA = [
    // paste April data here in same format
];
```
Then in the `getMonthData()` function, add April to the month tabs.

---

## 📱 STEP 5: HOW USERS INSTALL THE APP

### Android Users
1. Open Chrome and go to your app URL
2. Chrome shows "Install App" banner at bottom
3. Tap "Install" → App appears on home screen like a real app
4. Full screen, works offline

### iPhone Users
1. Open Safari and go to your app URL
2. Tap the Share button (box with arrow)
3. Scroll down → tap "Add to Home Screen"
4. Tap "Add" → App appears on home screen
5. Note: iPhone notifications require iOS 16.4+ and Safari

### Share with community
Send this message to your community WhatsApp group:

> 🕌 Hamilton Masjid now has a prayer times app!
> 
> 📱 Go to: [YOUR URL HERE]
> 
> iPhone: Tap Share → Add to Home Screen
> Android: Chrome will ask to install automatically
> 
> Features: Live countdowns, Ramadan calendar, prayer notifications, Hadith

---

## 🔄 STEP 6: FUTURE — ADDING HADITH

To add more Hadith to the app:
1. Open index.html
2. Find the Hadith View section (search for `hadithView`)
3. Copy an existing `<div class="hadith-card">` block
4. Replace the Arabic text and English translation
5. Upload to GitHub

To auto-fetch daily Hadith from the internet (advanced):
- Use the free Aladhan.com API
- URL: `https://api.aladhan.com/v1/gToHCalendar`
- No API key needed

---

## 💰 COST SUMMARY

| Item | Provider | Cost |
|------|----------|------|
| App hosting | GitHub Pages | FREE |
| Push notifications | OneSignal | FREE |
| Domain (optional) | Namecheap | ~$15 NZD/year |
| App icons design | Canva | FREE |
| **Total** | | **$0 ongoing** |

If you want a custom domain like `hamiltonmasjid.nz/app`:
- Buy domain: ~$15–25 NZD/year (Namecheap, GoDaddy)
- Point to GitHub Pages (free instructions on GitHub)

---

## 🆘 TROUBLESHOOTING

**App not updating after I upload files?**
- Wait 5 minutes for GitHub Pages to rebuild
- Open the app URL in incognito/private mode
- Or clear browser cache

**Notifications not working on iPhone?**
- iPhone requires iOS 16.4+ and the app must be added to home screen first
- Go to Settings → Notifications → Find your app → Enable

**Prayer times showing wrong?**
- Check the data in index.html — times are stored as AM/PM strings
- The app uses NZ local time automatically

**App not working offline?**
- Make sure sw.js is uploaded alongside index.html
- Service worker caches the app after first load

---

## 📞 SUPPORT

For technical help updating the app, you can share index.html with Claude (claude.ai) and ask for specific changes — the entire app is in one file, making it easy to update.

---

*Hamilton Masjid PWA — Built with love for the Hamilton Muslim community*
*Source data: FIANZ & Waikato Muslim Association*
