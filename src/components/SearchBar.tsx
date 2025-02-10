import styles from './SearchBar.module.css'
import { ChangeEventHandler, useContext } from 'react'
import { ThemeContext } from "@/themeContext";

type SearchBarProps = {
    searchTerm: string;
    searchContext: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

function SearchBar({searchTerm, searchContext, handleChange}: SearchBarProps): React.JSX.Element {
    const placeHolder = `Freetext ${searchContext ?? ''} search...`;
    const title = `Enter your ${searchContext ?? ''} search string here`;
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <div style={themeStyles} className={styles.searchBar}>
            <img className={styles.searchImg} src="/search.svg" alt="Search Glass"/>
            <input style={themeStyles} className={styles.searchInput} type="text" placeholder={placeHolder} title={title} value={searchTerm} onChange={handleChange}/>
        </div>
    )
}

export default SearchBar