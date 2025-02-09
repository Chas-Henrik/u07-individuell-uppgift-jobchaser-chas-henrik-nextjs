import styles from './Nav.module.css'
import React, { useContext }from "react";
import Link from "next/link";
import { ThemeContext } from "@/layout";

function Nav(): JSX.Element {
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <ul style={themeStyles} className={styles.nav}>
            <li>
                <Link href="/jobs">
                <p>Jobs</p>
                </Link>
            </li>
            <li>
                <Link href="/signin">
                <p>Sign In</p>
                </Link>
            </li>
            <li>
                <Link href="/signup">
                <p>Sign Up</p>
                </Link>
            </li>
        </ul>
    )
}

export default Nav