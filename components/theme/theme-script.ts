// Injected as an inline blocking script in app/layout.tsx <head>, before hydration,
// so the correct theme class is set before first paint (no flash of wrong theme).
export const noFlashThemeScript = `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'system';
    var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();`;
