import styles from './Job.module.css'

export type JobProps = {
    id: string;
    logo_url: string | null;
    employer: {
        name: string | null;
    };
    headline: string | null;
    occupation_group: {
        label: string | null;
    };
    occupation: {
        label: string | null;
    };
    publication_date: string | null;
    employment_type: {
        label: string | null;
    };
    workplace_address: {
        city: string | null;
        region: string | null;
        country: string | null;
    };
    webpage_url: string | null;
};

export function Job(data: JobProps): JSX.Element {
    const logotype = data.logo_url ? data.logo_url : "/not-available.svg";
    return (
        <article id={data.id} className={styles.jobContainer}>
            <img className={styles.jobImage} src={logotype} alt={`${data.employer.name} logo`}/>
            <h2>{data.employer.name}</h2>
            <div></div>
            <article className={styles.jobInfo}>
                <h3>Headline</h3><p>:</p><p>{data.headline}</p>
                <h3>Position</h3><p>:</p><p>{data.occupation_group.label}</p>
                <h3>Role</h3><p>:</p><p>{data.occupation.label}</p>
                <h3>Posted</h3><p>:</p><p>{data.publication_date}</p>
                <h3>Contract</h3><p>:</p><p>{data.employment_type.label}</p>
                <h3>City</h3><p>:</p><p>{data.workplace_address.city}</p>
                <h3>Region</h3><p>:</p><p>{data.workplace_address.region}</p>
                <h3>Country</h3><p>:</p><p>{data.workplace_address.country}</p>
                <h3>URL</h3><p>:</p><a href={data.webpage_url ?? '#'} title={data.webpage_url ?? 'Not available'} target="_blank">{data.webpage_url ?? 'Not available'}</a>
            </article>
        </article>
        )
}

export default Job