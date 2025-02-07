import styles from './JobList.module.css'
import {Job, JobProps} from './Job'
import { v4 as uuidv4 } from 'uuid';

type JobListProps = {
    jobsArr: JobProps[];
};

function JobList({jobsArr}: JobListProps): JSX.Element {
    const jobs: JSX.Element[] = jobsArr.map((job: JobProps) => <li className={styles.jobListItem} key={job.id}><Job {...job}/></li>);
    const jobList = jobs.length > 0 ? jobs : <li className={styles.jobListItem} key={uuidv4()}><p className={styles.jobListError}>No Jobs</p></li>;

    return (
        <ul className={styles.jobList}>
            {jobList}
        </ul>
    )
}

export default JobList