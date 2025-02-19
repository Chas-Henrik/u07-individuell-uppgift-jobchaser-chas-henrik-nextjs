'use client'

// https://jobsearch.api.jobtechdev.se/search?offset=0&limit=100&remote=true
// https://jobsearch.api.jobtechdev.se/search?remote=true

import styles from './Loader.module.css';
import { useEffect, useState, useContext } from 'react';
import type { ApiJobData, JobType } from '@/types/types'
import { readLocalStorageFavorites} from '@/store/localStorage';
import { SpinnerCircular } from 'spinners-react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useGetJobsQuery, appendJobs, selectJobs } from '@/lib/features/lists/jobsSlice'; 
import { ThemeContext } from "@/context/themeContext";

export type LoaderProps = {
    LoadingCompleteEvent: () => void;
}

export function Loader(props: LoaderProps) {
    // Local state variables
    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    const [pageNum, setPageNum] = useState<number>(0);
    const [totCount, setTotCount] = useState<number>(100);
    const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

    // Redux Toolkit (jobsSlice)
    const jobsArray = useAppSelector(selectJobs);
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

    if (jobsArray.length >= totCount) {
        setLoadingComplete(true);
    }

    // Load jobs from API
    const { data, error } = useGetJobsQuery({pageNum: pageNum, pageSize: loadingComplete? 0: 100}, { refetchOnMountOrArgChange: true });

    // React Hooks
    useEffect(() => {
        // console.log("pageNum", pageNum);
        // console.log("totCount", totCount);
        // console.log("error", error);
        // console.log("isLoading", isLoading);
        // console.log("jobsArray.length",jobsArray.length)
        // console.log("data", data);
        // console.log("loadingComplete",loadingComplete)

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
            return;
        }
        if (data && !loadingComplete) {
            const favoriteJobs = readLocalStorageFavorites();
            const total = data?.total.value ?? 0;
            const jobsDataArr = data?.hits.map((job: ApiJobData) => ParseData(job, favoriteJobs)) ?? [];
            setTotCount(total);
            jobsDispatch(appendJobs(jobsDataArr) ?? []);
            if((pageNum + 1) * 100 >= total){
                setShowSpinner(false);
                setLoadingComplete(true);
                props.LoadingCompleteEvent();
            } else {
                setPageNum((prevPageNum) => prevPageNum + 1);
            }
            
        }
    }, [props, data, error, loadingComplete, jobsDispatch, pageNum, totCount]);


    return (
        <>
            {showSpinner && <div style={themeStyles} className={styles.spinnerCircular}><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p className={styles.spinnerLabel}>Loading...</p></div>}
        </>
    )
}