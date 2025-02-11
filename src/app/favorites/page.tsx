'use client'

import styles from './Favorites.module.css';
import { useState, useEffect, useContext } from "react";
import { JobProps } from '@/components/Job';
import { readLocalStorage, writeLocalStorage } from '@/localStorage';
import JobList from '@/components/JobList';
import { ThemeContext } from "@/context/themeContext";

export default function Favorites() {
    const [favoriteList, setFavoriteList] = useState<JobProps[]>([]);
    const {darkTheme} = useContext(ThemeContext);
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
            }
            writeLocalStorage("u07-jobchaser-chas-henrik-nextjs : favorites", prevJobs.filter(job => job.favorite));
            return [...prevJobs];
        });
    }

    useEffect(() => {
        const favoriteJobs: JobProps[] = readLocalStorage("u07-jobchaser-chas-henrik-nextjs : favorites");
        favoriteJobs.map(job => job.SetFavoriteClickedEvent = SetFavoriteEvent);
        setFavoriteList(favoriteJobs);
    }, []);

    return (
        <article style={themeStyles} className={styles.favoritesContainer}>
            <JobList jobsArr={favoriteList}/>
        </article>
    )
}