/**
 * Runs before interactive paint so the first paint matches localStorage (avoids flash).
 * Keep `THEME_STORAGE_KEY` in sync with `lib/theme/constants.js`.
 */

export function themeInitScriptInnerHtml() {
  return `(function(){try{var k='apex-theme',t=localStorage.getItem(k);if(t==='light')document.documentElement.setAttribute('data-theme','light');else document.documentElement.setAttribute('data-theme','dark')}catch(_){document.documentElement.setAttribute('data-theme','dark')}})();`;
}
