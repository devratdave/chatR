import { create } from 'zustand'

export const useTheme = create((set) => ({
    theme: localStorage.getItem("theme") || "night",
    setTheme: (theme) => {
        set({theme})
        localStorage.setItem("theme", theme);
    }
}))
