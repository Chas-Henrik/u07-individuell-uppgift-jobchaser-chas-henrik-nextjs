'use client'

// https://jobsearch.api.jobtechdev.se/search?offset=0&limit=100&remote=true
// https://jobsearch.api.jobtechdev.se/search?remote=true

import styles from './Jobs.module.css';
import { useEffect, useState, useContext } from 'react';
import { SpinnerCircular } from 'spinners-react';
import { JobProps } from '@/components/Job';
import { readLocalStorageFavorites} from '@/store/localStorage';
import { ComboBox } from '@/components/ComboBox';
import JobList from '@/components/JobList';
import SearchBar from '@/components/SearchBar';
import { ThemeContext } from "@/context/themeContext";
import { JobType } from '@/lib/features/lists/jobsSlice';

import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setFilterPosition, setFilterRole, setFilterContract, setFilterCity, setFilterRegion, setFilterCountry, setFilterHeadline,
  selectFilterPosition, selectFilterRole, selectFilterContract, selectFilterCity, selectFilterRegion, selectFilterCountry, selectFilterHeadline
  } from '@/lib/features/filters/filterSlice'
import { ApiJobType, ApiJobData, fetchJobs, setJobs, appendJobs, setFavorite, selectJobs } from '@/lib/features/lists/jobsSlice'; 



const filterAll = 'all';

let filterTermsPosition: string[] = [];
let filterTermsRole: string[] = [];
let filterTermsContract: string[] = [];
let filterTermsCity : string[] = [];
let filterTermsRegion : string[] = [];
let filterTermsCountry : string[] = [];


function UpdateFilterTerms(jobsArray: JobProps[]): void {
  filterTermsPosition = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.position.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsRole = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.role.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsContract = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.contract.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsCity = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.city.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsRegion = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.region.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterTermsCountry = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.country.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
}


export default function Home() {
  // Local state variables
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redux Toolkit (jobsSlice)
  const jobsArray = useAppSelector(selectJobs);
  // const { status } = useAppSelector((state) => state.jobs);

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

  function SetFavoriteClickedEvent(id: string, favorite: boolean) {
    jobsDispatch(setFavorite({ id: id, favorite: favorite }));
  }
  
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
        url: data.webpage_url ?? ''
      };
    
      return job;
    }

    async function FetchData(): Promise<void> {
      let pageNum = 0;
      const pageSize = 100;
      let totCount = 0;

      try {
        setIsLoading(true);
        const favoriteJobs = readLocalStorageFavorites();
        do {
          let jobsDataArr: JobType[] = [];
          const resultAction = await jobsDispatch(fetchJobs(`https://jobsearch.api.jobtechdev.se/search?offset=${pageNum*pageSize}&limit=${pageSize}&remote=true`));
          if (fetchJobs.fulfilled.match(resultAction)) {
            const dataObj: ApiJobType = resultAction.payload;
            totCount = dataObj?.total.value ?? 0;
            jobsDataArr = dataObj?.hits.map((job:ApiJobData) => ParseData(job, favoriteJobs)) ?? [];
          } else {
            throw new Error('Failed to fetch jobs');
          }
          jobsDispatch(appendJobs(jobsDataArr ?? []));
          pageNum++;
        } while (pageNum*pageSize < totCount);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    // Don't fetch data from API if we already have it
    if(jobsArray.length === 0){
      FetchData();
    }
  }, []);


  // Helper Functions

  function applyFilters(jobsArr: JobProps[]): JobProps[] {
    let filteredJobs = (!filterPosition || filterPosition === filterAll) ? jobsArr : jobsArr.filter((job) => job.position.toLowerCase().includes(filterPosition.toLowerCase()));
    filteredJobs = (!filterRole || filterRole === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.role.toLowerCase().includes(filterRole.toLowerCase()));
    filteredJobs = (!filterContract || filterContract === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.contract.toLowerCase().includes(filterContract.toLowerCase()));
    filteredJobs = (!filterCity || filterCity === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.city.toLowerCase().includes(filterCity.toLowerCase()));
    filteredJobs = (!filterRegion || filterRegion === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.region.toLowerCase().includes(filterRegion.toLowerCase()));
    filteredJobs = (!filterCountry || filterCountry === filterAll) ? filteredJobs : filteredJobs.filter((job) => job.country.toLowerCase().includes(filterCountry.toLowerCase()));

    return filteredJobs.filter(job => job.headline?.toLowerCase().includes(filterHeadline.toLowerCase()));
  }

  const filteredJobs = applyFilters(jobsArray.map(job => ({ ...job, SetFavoriteClickedEvent: SetFavoriteClickedEvent })));
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
        {isLoading && <div style={themeStyles} className={styles.spinnerCircular}><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p className={styles.spinnerLabel}>Loading...</p></div>}
      </main>
    </>
  )
}
