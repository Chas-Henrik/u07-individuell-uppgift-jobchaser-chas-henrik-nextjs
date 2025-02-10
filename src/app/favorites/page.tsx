'use client'

import styles from './Favorites.module.css'
import { useState, useEffect, useContext } from "react";
import {JobProps} from '@/components/Job'
import JobList from '@/components/JobList'
import { ThemeContext } from "@/themeContext";

type FavoriteProps = {
    favoriteList: JobProps[];
}

export default function Favorites(props: FavoriteProps) {
    const [favoriteList, setFavoriteList] = useState<JobProps[]>([]);
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    useEffect(() => {
        function fetchDataLS(): JobProps[] {
            const lsData = localStorage.getItem("u07-jobchaser-chas-henrik-nextjs : favorites");
            return lsData ? JSON.parse(lsData) : [];

        }
        setFavoriteList(fetchDataLS());
    }, []);

    return (
        <article style={themeStyles} className={styles.favoritesContainer}>
            <JobList jobsArr={favoriteList}/>
        </article>
    )
}