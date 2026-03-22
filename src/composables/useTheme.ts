import { ref, computed } from 'vue';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'kj-theme-preference';

// Global state
const globalTheme = ref<Theme>('dark');

export function useGlobalTheme() {
    const updateDOM = (newTheme: Theme) => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    };

    const initTheme = () => {
        const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
        if (savedTheme) {
            globalTheme.value = savedTheme;
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            globalTheme.value = prefersDark ? 'dark' : 'light';
        }
        updateDOM(globalTheme.value);
    };

    const toggleTheme = () => {
        globalTheme.value = globalTheme.value === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, globalTheme.value);
        updateDOM(globalTheme.value);
    };

    return {
        theme: globalTheme,
        isDark: computed(() => globalTheme.value === 'dark'),
        toggleTheme,
        initTheme
    };
}
