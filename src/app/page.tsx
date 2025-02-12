'use client'
import styles from './Home.module.css'
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

export default function LandingPage() {
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    return (
        <article style={themeStyles} className={styles.article} >
            <h1 className={styles.h1}>Landing Page</h1>
        </article>
    )
}