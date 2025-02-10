import styles from './JobList.module.css'
import { useContext } from "react";
import {Job, JobProps} from './Job'
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from "@/themeContext";

type JobListProps = {
    jobsArr: JobProps[];
};

function JobList({jobsArr}: JobListProps): React.JSX.Element {
    const jobs: React.JSX.Element[] = jobsArr.map((job: JobProps) => <li className={styles.jobListItem} key={job.id}><Job {...job}/></li>);
    const jobList = jobs.length > 0 ? jobs : <li className={styles.jobListItem} key={uuidv4()}><p className={styles.jobListError}>No Jobs</p></li>;
    const {darkTheme} = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <ul style={themeStyles} className={styles.jobList}>
            {jobList}
        </ul>
    )
}

export default JobList