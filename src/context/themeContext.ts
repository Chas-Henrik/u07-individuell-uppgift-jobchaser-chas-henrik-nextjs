// themeContext.ts
"use client";
import { createContext } from "react";

export type Theme = { 
    darkTheme: boolean; 
    toggleTheme: () => void;
};

export const ThemeContext = createContext<Theme | undefined>(undefined);