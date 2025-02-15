'use client'

import styles from './Favorites.module.css';
import { useState, useEffect, useContext } from "react";
import { JobProps } from '@/components/Job';
import { readLocalStorageFavorites, addLocalStorageFavorites, removeLocalStorageFavorites } from '@/store/localStorage';
import JobList from '@/components/JobList';
import { ThemeContext } from "@/context/themeContext";

export default function Favorites() {
    const [favoriteList, setFavoriteList] = useState<JobProps[]>([]);
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };

    const SetFavoriteEvent = (id: string, favorite: boolean) => {
        setFavoriteList((prevJobs) => {
            const job: (JobProps | undefined) = prevJobs.find(job => job.id === id);
            if (job) {
                job.favorite = favorite;
                if (favorite) {
                    addLocalStorageFavorites(job);
                } else {
                    removeLocalStorageFavorites(job);
                }
            }
            return [...prevJobs];
        });
    }

    useEffect(() => {
        const favoriteJobs: JobProps[] = readLocalStorageFavorites();
        favoriteJobs.map(job => job.SetFavoriteClickedEvent = SetFavoriteEvent);
        setFavoriteList(favoriteJobs);
    }, []);

    return (
        <article style={themeStyles} className={styles.favoritesContainer}>
            <JobList jobsArr={favoriteList}/>
        </article>
    )
}