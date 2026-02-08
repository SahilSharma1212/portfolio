import { create } from 'zustand';

export type themeStore = {
    theme: string,
    setTheme: (theme: string) => void
}

export const useThemeStore = create<themeStore>((set) => ({
    theme: 'light',
    setTheme: (theme: string) => set({ theme }),
}))