'use client'

import type { JobType } from '@/types/types'
import styles from './Job.module.css';
import Image from 'next/image';
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { toggleFavorite } from '@/lib/features/lists/jobsSlice';
import { useAppDispatch } from '@/lib/hooks';

export function Job(data: JobType): React.JSX.Element {
    const jobsDispatch = useAppDispatch();
    const logotype = data.logo_url ? data.logo_url : "/not-available.svg";
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#ccc' : '#555',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };
    const favoriteIcon = (data.favorite) ? ((darkTheme) ? "/favorite-filled-dark.svg" : "/favorite-filled.svg") : ((darkTheme) ? "/favorite-dark.svg": "/favorite.svg");
    const favoriteTitle = data.favorite ? "Remove from Favorite" : "Add to Favorite";

    return (
        <article style={themeStyles} id={data.id} className={styles.jobContainer}>
            <img style={themeStyles} className={styles.jobImg} src={logotype} alt={`${data.employer} logo`}/>
            <article className={styles.jobHeaderInfo}>
                <h2 className={styles.jobHeader}>{data.employer}</h2>
                <Image id={data.id} className={styles.favoriteImg} src={favoriteIcon} width={24} height={24} onClick={(e) => {jobsDispatch(toggleFavorite({id: (e.target as HTMLImageElement).id}))}} title={favoriteTitle} alt='favorite icon'/>
            </article>
            <div />
            <article className={styles.jobInfo}>
                <h3 className={styles.jobInfoHeader}>Headline</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.headline}</p>
                <h3 className={styles.jobInfoHeader}>Position</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.position}</p>
                <h3 className={styles.jobInfoHeader}>Role</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.role}</p>
                <h3 className={styles.jobInfoHeader}>Posted</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.posted}</p>
                <h3 className={styles.jobInfoHeader}>Expires</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.expires}</p>
                <h3 className={styles.jobInfoHeader}>Contract</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.contract}</p>
                <h3 className={styles.jobInfoHeader}>City</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.city}</p>
                <h3 className={styles.jobInfoHeader}>Region</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.region}</p>
                <h3 className={styles.jobInfoHeader}>Country</h3><p className={styles.jobInfoParagraph}>:</p><p className={styles.jobInfoParagraph}>{data.country}</p>
                <h3 className={styles.jobInfoHeader}>URL</h3><p className={styles.jobInfoParagraph}>:</p><a className={styles.jobInfoLink} href={data.url} title={data.url} target="_blank">{data.url}</a>
            </article>
        </article>
        )
}

export default Job