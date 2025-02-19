'use client'

// https://jobsearch.api.jobtechdev.se/search?offset=0&limit=100&remote=true
// https://jobsearch.api.jobtechdev.se/search?remote=true

import styles from './Jobs.module.css';
import { useContext } from 'react';
import {Loader} from '@/components/Loader';
import type { JobType } from '@/types/types'
import { ComboBox } from '@/components/ComboBox';
import JobList from '@/components/JobList';
import SearchBar from '@/components/SearchBar';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setFilterPosition, setFilterRole, setFilterContract, setFilterCity, setFilterRegion, setFilterCountry, setFilterHeadline,
  selectFilterPosition, selectFilterRole, selectFilterContract, selectFilterCity, selectFilterRegion, selectFilterCountry, selectFilterHeadline
  } from '@/lib/features/filters/filterSlice'
import { setLoadingComplete, selectLoadingComplete, selectJobs } from '@/lib/features/lists/jobsSlice'; 
import { ThemeContext } from "@/context/themeContext";


const filterAll = 'all';

let filterTermsPosition: string[] = [];
let filterTermsRole: string[] = [];
let filterTermsContract: string[] = [];
let filterTermsCity : string[] = [];
let filterTermsRegion : string[] = [];
let filterTermsCountry : string[] = [];


function UpdateFilterTerms(jobsArray: JobType[]): void {
  filterTermsPosition = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.position.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsRole = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.role.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsContract = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.contract.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsCity = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.city.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsRegion = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.region.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsCountry = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.country.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
}


export default function Home() {
  // Redux Toolkit (jobsSlice)
  const jobsArray = useAppSelector(selectJobs);
  const loadingComplete = useAppSelector(selectLoadingComplete);

  const jobsDispatch = useAppDispatch();

  // Redux Toolkit (jobFilterSlice)
  const filterPosition = useAppSelector(selectFilterPosition);
  const filterRole = useAppSelector(selectFilterRole);
  const filterContract = useAppSelector(selectFilterContract);
  const filterCity = useAppSelector(selectFilterCity);
  const filterRegion = useAppSelector(selectFilterRegion);
  const filterCountry = useAppSelector(selectFilterCountry);
  const filterHeadline = useAppSelector(selectFilterHeadline);

  const filterDispatch = useAppDispatch();

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

  // Event Handlers

  function LoadingCompleteEventHandler() {
    jobsDispatch(setLoadingComplete(true));
  }

  // Helper Functions

  function applyFilters(jobsArr: JobType[]): JobType[] {
    let filteredJobs = (!filterPosition || filterPosition === filterAll) ? jobsArr : jobsArr.filter((job) => job.position.toLowerCase().includes(filterPosition.toLowerCase()));
    filteredJobs = (!filterRole || filterRole === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.role.toLowerCase().includes(filterRole.toLowerCase()));
    filteredJobs = (!filterContract || filterContract === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.contract.toLowerCase().includes(filterContract.toLowerCase()));
    filteredJobs = (!filterCity || filterCity === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.city.toLowerCase().includes(filterCity.toLowerCase()));
    filteredJobs = (!filterRegion || filterRegion === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.region.toLowerCase().includes(filterRegion.toLowerCase()));
    filteredJobs = (!filterCountry || filterCountry === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.country.toLowerCase().includes(filterCountry.toLowerCase()));

    return filteredJobs.filter(job => job.headline?.toLowerCase().includes(filterHeadline.toLowerCase()));
  }

  const filteredJobs = applyFilters(jobsArray);
  UpdateFilterTerms(filteredJobs);

  return (
    <>
      <details style={themeStyles} className={styles.searchContainer}>
        <summary className={styles.summary}>Filters</summary>
        <article className={styles.filtersContainer}>
          <ComboBox filterTitle="Position" filterTerms={filterTermsPosition} handleSelect={(value:string) => filterDispatch(setFilterPosition(value))}/>
          <ComboBox filterTitle="Role" filterTerms={filterTermsRole} handleSelect={(value:string) => filterDispatch(setFilterRole(value))}/>
          <ComboBox filterTitle="Contract Type" filterTerms={filterTermsContract} handleSelect={(value:string) => filterDispatch(setFilterContract(value))}/>
          <ComboBox filterTitle="City" filterTerms={filterTermsCity} handleSelect={(value:string) => filterDispatch(setFilterCity(value))}/>
          <ComboBox filterTitle="Region" filterTerms={filterTermsRegion} handleSelect={(value:string) => filterDispatch(setFilterRegion(value))}/>
          <ComboBox filterTitle="Country" filterTerms={filterTermsCountry} handleSelect={(value:string) => filterDispatch(setFilterCountry(value))}/>
        </article>
        <SearchBar searchTerm={filterHeadline} searchContext={"'Headline'"} handleChange={(e: React.ChangeEvent<HTMLInputElement>) => filterDispatch(setFilterHeadline(e.target.value))}/>
      </details>
      <main className={styles.main} style={themeStyles}>
        <JobList jobsArr={filteredJobs}/>
        {!loadingComplete && <Loader LoadingCompleteEvent={LoadingCompleteEventHandler}/>}
      </main>
    </>
  )
}
