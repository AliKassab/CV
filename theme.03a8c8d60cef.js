(() => {
    const root = document.documentElement;
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    let stored;
    try { stored = localStorage.getItem('theme'); } catch (_) {}
    const apply = (theme) => {
        root.dataset.theme = theme;
        const toggle = document.getElementById('theme-toggle');
        if (toggle) toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    };
    apply(stored === 'dark' || stored === 'light' ? stored : preference.matches ? 'dark' : 'light');
    document.addEventListener('DOMContentLoaded', () => {
        apply(root.dataset.theme);
        document.getElementById('theme-toggle').addEventListener('click', () => {
            stored = root.dataset.theme === 'dark' ? 'light' : 'dark';
            apply(stored);
            try { localStorage.setItem('theme', stored); } catch (_) {}
        });
    });
    preference.addEventListener('change', () => {
        if (stored !== 'dark' && stored !== 'light') apply(preference.matches ? 'dark' : 'light');
    });
})();
