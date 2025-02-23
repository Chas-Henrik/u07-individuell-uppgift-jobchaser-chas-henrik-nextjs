'use client'

// https://jobsearch.api.jobtechdev.se/search?offset=0&limit=100&remote=true
// https://jobsearch.api.jobtechdev.se/search?remote=true

import styles from './Loader.module.css';
import { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import type { ApiJobType, ApiJobData, JobType } from '@/types/types'
import { readLocalStorageFavorites} from '@/store/localStorage';
import { SpinnerCircular } from 'spinners-react';
import { useAppDispatch } from '@/lib/hooks'
import { appendJobs } from '@/lib/features/lists/jobsSlice';
import { ThemeContext } from "@/context/themeContext";

export type LoaderProps = {
    LoadingCompleteEvent: () => void;
}

async function fetcher(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('An error occurred while fetching the data.');
        }
        const data: ApiJobType = await res.json();
        return {data: data};
    } catch (error) {
        console.error(error);
        return {error: error};
    }
}

export function Loader(props: LoaderProps) {
    // Local state variables
    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    const [pageNum, setPageNum] = useState<number>(0);
    const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
    const pageSize = 100;

    // Redux Toolkit (jobsSlice)
    const jobsDispatch = useAppDispatch();

    // Theme Context
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

    // Load jobs from API
    const { data, error } = useSWR(`https://jobsearch.api.jobtechdev.se/search?offset=${pageNum * pageSize}&limit=${pageSize}&remote=true`, fetcher);

    // React Hooks
    useEffect(() => {

        function ParseData(data: ApiJobData, favorites: JobType[]): JobType {
            const job: JobType = {
                id: data.id,
                favorite: favorites.some(favJob => favJob.id === data.id),
                logo_url:  data.logo_url ?? '',
                employer:  data.employer.name ?? '',
                headline:  data.headline ?? '',
                position: data.occupation_group.label ?? '',
                role: data.occupation.label ?? '',
                posted: data.publication_date ?? '',
                expires: data.application_deadline ?? '',
                contract: data.employment_type.label ?? '',
                city: data.workplace_address.city ?? '',
                region: data.workplace_address.region ?? '',
                country: data.workplace_address.country ?? '',
                url: data.webpage_url ?? '',
            };
            return job;
        }

        if(error){
            console.error(error);
        } else if (data && !loadingComplete) {
            const favoriteJobs = readLocalStorageFavorites();
            const total = data?.data?.total.value ?? 0;
            const jobsDataArr = data?.data?.hits.map((job: ApiJobData) => ParseData(job, favoriteJobs)) ?? [];
            jobsDispatch(appendJobs(jobsDataArr) ?? []);
            if((pageNum + 1) * 100 >= total){
                setShowSpinner(false);
                setLoadingComplete(true);
                props.LoadingCompleteEvent();
            } else {
                setPageNum((prevPageNum) => prevPageNum + 1);
            }
        }
    }, [props, data, error, loadingComplete, jobsDispatch, pageNum]);


    return (
        showSpinner && <div style={themeStyles} className={styles.spinnerCircular}><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p className={styles.spinnerLabel}>Loading...</p></div>
    );

}