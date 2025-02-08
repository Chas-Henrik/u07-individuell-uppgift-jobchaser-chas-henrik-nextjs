import styles from './Job.module.css'

export type JobProps = {
    id: string;
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
};

export function Job(data: JobProps): JSX.Element {
    const logotype = data.logo_url ? data.logo_url : "/not-available.svg";
    return (
        <article id={data.id} className={styles.jobContainer}>
            <img className={styles.jobImage} src={logotype} alt={`${data.employer} logo`}/>
            <h2 className={styles.jobHeader}>{data.employer}</h2>
            <div></div>
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