'use client'

import styles from './SearchBar.module.css';
import Image from 'next/image';
import { motion } from "framer-motion"
import { ChangeEventHandler, useContext } from 'react';
import { ThemeContext } from "@/context/themeContext";

type SearchBarProps = {
    searchTerm: string;
    searchContext: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

function SearchBar({searchTerm, searchContext, handleChange}: SearchBarProps): React.JSX.Element {
    const placeHolder = `Freetext ${searchContext ?? ''} search...`;
    const title = `Enter your ${searchContext ?? ''} search string here`;
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStylesDiv = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <motion.div whileHover={{ scale: 1.2, boxShadow: darkTheme?'var(--primary-box-shadow-dark-theme-hover)':'var(--primary-box-shadow-light-theme-hover)' }} style={themeStylesDiv} className={styles.searchBar}>
            <Image style={themeStyles} className={styles.searchImg} src="/search.svg" width={24} height={24} alt="Search Glass"/>
            <input style={themeStyles} className={styles.searchInput} type="text" placeholder={placeHolder} title={title} value={searchTerm} onChange={handleChange}/>
        </motion.div>
    )
}

export default SearchBar