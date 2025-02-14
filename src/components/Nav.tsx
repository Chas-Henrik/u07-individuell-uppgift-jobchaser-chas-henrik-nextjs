'use client'

import styles from './Nav.module.css';
import React, { useContext }from "react";
import { motion } from "framer-motion"
import Link from "next/link";
import { ThemeContext } from "@/context/themeContext";

function Nav(): React.JSX.Element {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };
    const buttonThemeStyles = {
        backgroundColor: darkTheme ? '#AAA' : '#DDD',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };
    return (
        <ul style={themeStyles} className={styles.nav}>
            <motion.li whileHover={{ scale: 1.2, backgroundColor: darkTheme?'#CCC':'#BBB', boxShadow: darkTheme?'var(--primary-box-shadow-dark-theme-hover)':'var(--primary-box-shadow-light-theme-hover)' }} style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/" scroll={false}>
                    <p>Home</p>
                </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2, backgroundColor: darkTheme?'#CCC':'#BBB', boxShadow: darkTheme?'var(--primary-box-shadow-dark-theme-hover)':'var(--primary-box-shadow-light-theme-hover)' }} style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/signup" scroll={false}>
                    <p>Sign Up</p>
                </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2, backgroundColor: darkTheme?'#CCC':'#BBB', boxShadow: darkTheme?'var(--primary-box-shadow-dark-theme-hover)':'var(--primary-box-shadow-light-theme-hover)' }} style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/signin" scroll={false}>
                    <p>Sign In</p>
                </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2, backgroundColor: darkTheme?'#CCC':'#BBB', boxShadow: darkTheme?'var(--primary-box-shadow-dark-theme-hover)':'var(--primary-box-shadow-light-theme-hover)' }} style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/jobs" scroll={false}>
                    <p>Jobs</p>
                </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2, backgroundColor: darkTheme?'#CCC':'#BBB', boxShadow: darkTheme?'var(--primary-box-shadow-dark-theme-hover)':'var(--primary-box-shadow-light-theme-hover)' }} style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/favorites" scroll={false}>
                    <p>Favorites</p>
                </Link>
            </motion.li>
        </ul>
    )
}

export default Nav