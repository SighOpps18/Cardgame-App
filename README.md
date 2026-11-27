# Cardscore
A zero-dependency, ad-free, offline-first card scorekeeper.

## Installation
Serve the contents of this directory at an HTTPS URL (any static web host). No server-side application is needed. Open the URL on your phone while online, wait for the offline-ready status, then install via the browser:
- iPhone: Safari → Share → Add to Home Screen.
- Android: Chrome menu → Install app or Add to Home screen.

After initial caching, the app works without internet. Test by enabling airplane mode and reopening the installed app. A local file URL is not sufficient for PWA installation.

For desktop development, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

All profile, round, and game data is stored in localStorage, independently on each device. Clearing browser/site data or uninstalling may remove scores. No telemetry, ads, or remote requests. Tied winners receive a win each. Team player statistics use the team score. A completed game stays available for undo until its result is saved. Manual end records the current standings.

## Files
- index.html / style.css: interface shell and styling
- app.mjs: screens, local persistence, interaction
- score.mjs: pure scoring logic
- sw.js / manifest.webmanifest: offline cache and installation
