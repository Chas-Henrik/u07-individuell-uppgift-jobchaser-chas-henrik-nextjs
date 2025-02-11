import React, { useContext, useState, createContext, ReactNode } from 'react'

export const ThemeContext = createContext(false);
export const ThemeUpdateContext = createContext<() => void>(() => {});

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {

    const [darkTheme, setDarkTheme] = useState(false);

    function toggleTheme() {
        console.log('toggleTheme');
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}