import styles from './Nav.module.css'
import React, { useContext }from "react";
import Link from "next/link";
import { ThemeContext } from "@/themeContext";

function Nav(): React.JSX.Element {
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };
    const buttonThemeStyles = {
        backgroundColor: darkTheme ? '#AAA' : '#DDD',
        color: darkTheme ? '#fff' : '#333'
    };
    return (
        <ul style={themeStyles} className={styles.nav}>
            <li style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/">
                <p>Home</p>
                </Link>
            </li>
            <li style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/signup">
                <p>Sign Up</p>
                </Link>
            </li>
            <li style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/signin">
                <p>Sign In</p>
                </Link>
            </li>
            <li style={buttonThemeStyles} className={styles.liItem}>
                <Link href="/jobs">
                <p>Jobs</p>
                </Link>
            </li>
        </ul>
    )
}

export default Nav