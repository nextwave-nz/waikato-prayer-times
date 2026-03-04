# 🕌 Waikato Prayer Times

Official prayer times Progressive Web App for **Hamilton Jamia Mosque** and the Waikato Muslim community, New Zealand.

**Live app:** https://[your-username].github.io/waikato-prayer-times/

---

## Features

- 📅 Daily Iqama (congregation) times for Hamilton Jamia Mosque
- 🌙 Full Ramadan calendar — Suhoor & Iftar times (FIANZ + WMA)
- ⏱️ Live countdown to next prayer
- ✅ Prayer tracker with daily streak
- 📖 Daily Hadith rotation (30 verified hadith)
- 🤲 Iftar & Suhoor duas
- 📲 Installable PWA — works offline
- 🔔 Prayer time notifications

## Data Sources

- **Iqama times:** Waikato Muslim Association (WMA) monthly PDF timetables
- **Suhoor / Iftar:** FIANZ Hamilton Ramadan Calendar
- **Ramadan 1447H:** Starts 20 February 2026 (NZ local moon sighting)

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main app |
| `sw.js` | Service Worker (offline + notifications) |
| `manifest.json` | PWA manifest for install prompt |
| `admin.html` | Admin panel for mosque data updates |
| `privacy-policy.html` | Privacy policy (required for app stores) |

## Deployment

Hosted on GitHub Pages. Every push to `main` deploys automatically.

**After any update — bump `CACHE_VERSION` in `sw.js`** (v3 → v4 etc.) so installed PWA users get the fresh version.

## Mosque

**Hamilton Jamia Mosque**  
921 Heaphy Terrace, Hamilton  
Phone: 07 855 0567  
Email: wma@xtra.co.nz  
Friday Khutbah: 1:40 PM
