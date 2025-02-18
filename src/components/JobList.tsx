'use client'

import styles from './JobList.module.css';
import { useContext } from "react";
import type { JobType } from '@/types/types'
import {Job} from './Job';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from "@/context/themeContext";

type JobListProps = {
    jobsArr: JobType[];
};

function JobList({jobsArr}: JobListProps): React.JSX.Element {
    const jobs: React.JSX.Element[] = jobsArr.map((job: JobType) => <li className={styles.jobListItem} key={uuidv4()}><Job {...job}/></li>);
    const jobList = jobs.length > 0 ? jobs : <li className={styles.jobListItem} key={uuidv4()}><p className={styles.jobListError}>No Jobs</p></li>;
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
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