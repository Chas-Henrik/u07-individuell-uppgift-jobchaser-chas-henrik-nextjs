'use client'
import styles from './Home.module.css'
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

export default function LandingPage() {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
    };

    return (
        <article style={themeStyles} className={styles.article} >
            <h1 className={styles.h1}>Job Chaser</h1>
            <p className={styles.p}>The ultimate tool for finding remote positions...</p>
        </article>
    )
}