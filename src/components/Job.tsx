'use client'

import styles from './Job.module.css';
import Image from 'next/image';
import { useContext } from "react";
import { ThemeContext } from "@/themeContext";


export type JobProps = {
    id: string;
    favorite: boolean;
    logo_url: string;
    employer:  string;
    headline: string;
    position: string;
    role: string;
    posted: string;
    expires: string;
    contract: string;
    city: string;
    region: string;
    country: string;
    url: string;
    SetFavoriteClickedEvent: (id: string, favorite: boolean) => void;
};

export function Job(data: JobProps): React.JSX.Element {
    const logotype = data.logo_url ? data.logo_url : "/not-available.svg";
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
    };
    const favoriteIcon = (data.favorite) ? ((darkTheme) ? "/favorite-filled-dark.svg" : "/favorite-filled.svg") : ((darkTheme) ? "/favorite-dark.svg": "/favorite.svg");
    const favoriteTitle = data.favorite ? "Remove from Favorite" : "Add to Favorite";

    const ClickEventHandler: React.MouseEventHandler<HTMLImageElement> = () => { 
        data.SetFavoriteClickedEvent(data.id, !data.favorite);
    };

    return (
        <article style={themeStyles} id={data.id} className={styles.jobContainer}>
            <img style={themeStyles} className={styles.jobImg} src={logotype} alt={`${data.employer} logo`}/>
            <article className={styles.jobHeaderInfo}>
                <h2 className={styles.jobHeader}>{data.employer}</h2>
                <Image className={styles.favoriteImg} src={favoriteIcon} width={24} height={24} onClick={ClickEventHandler} title={favoriteTitle} alt='favorite icon'/>
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