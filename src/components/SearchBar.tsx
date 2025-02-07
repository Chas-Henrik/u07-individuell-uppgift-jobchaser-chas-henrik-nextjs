import { ChangeEventHandler } from 'react'
import styles from './SearchBar.module.css'

type SearchBarProps = {
    searchTerm: string;
    searchContext: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

function SearchBar({searchTerm, searchContext, handleChange}: SearchBarProps): JSX.Element {
    const placeHolder = `Freetext ${searchContext ?? ''} search...`;
    const title = `Enter your ${searchContext ?? ''} search string here`;
    return (
        <div className={styles.searchBar}>
            <img className={styles.searchImg} src="/search.svg" alt="Search Glass"/>
            <input className={styles.searchInput} type="text" placeholder={placeHolder} title={title} value={searchTerm} onChange={handleChange}/>
        </div>
    )
}

export default SearchBar