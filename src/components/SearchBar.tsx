'use client'

import styles from './SearchBar.module.css';
import Image from 'next/image';
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
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <div style={themeStyles} className={styles.searchBar}>
            <Image className={styles.searchImg} src="/search.svg" width={24} height={24} alt="Search Glass"/>
            <input style={themeStyles} className={styles.searchInput} type="text" placeholder={placeHolder} title={title} value={searchTerm} onChange={handleChange}/>
        </div>
    )
}

export default SearchBar