import { create } from 'zustand';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  darkMode: boolean;
}

interface ThemeStore {
  theme: ThemeSettings;
  setTheme: (theme: Partial<ThemeSettings>) => void;
  loadTheme: (userId: string) => void;
  resetTheme: () => void;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#ff6b9d',
  secondaryColor: '#c44569',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  darkMode: false,
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: defaultTheme,
  setTheme: (newTheme) =>
    set((state) => ({
      theme: { ...state.theme, ...newTheme },
    })),
  loadTheme: (userId: string) => {
    // 主题会从Firebase加载
    const savedTheme = localStorage.getItem(`theme_${userId}`);
    if (savedTheme) {
      try {
        set({ theme: { ...defaultTheme, ...JSON.parse(savedTheme) } });
      } catch {
        set({ theme: defaultTheme });
      }
    }
  },
  resetTheme: () => set({ theme: defaultTheme }),
}));
