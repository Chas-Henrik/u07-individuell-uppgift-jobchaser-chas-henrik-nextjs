'use client'

import styles from './Jobs.module.css';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SpinnerCircular } from 'spinners-react';
import { JobProps } from '@/components/Job';
import { readLocalStorageFavorites, addLocalStorageFavorites, removeLocalStorageFavorites } from '@/store/localStorage';
import { ComboBox } from '@/components/ComboBox';
import JobList from '@/components/JobList';
import SearchBar from '@/components/SearchBar';
import { ThemeContext } from "@/context/themeContext";

async function fetchJobs(url: string) {
  try {
      const response = await fetch(url);
      if(!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();
      // console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw new Error(`Error fetching data from ${url}`);
  }
}

type JobData = {
  id: string;
  logo_url: string;
  employer: { name: string };
  headline: string;
  occupation_group: { label: string };
  occupation: { label: string };
  publication_date: string;
  application_deadline: string;
  employment_type: { label: string };
  workplace_address: { city: string; region: string; country: string };
  webpage_url: string;
}

let jobsArrGlobal: JobProps[] = [];

// State Reducer

type State = {
  jobsArr: JobProps[];
  filteredJobsArr: JobProps[];
}

enum ACTIONS {
  SET_JOBS = 'set-jobs',
  FILTER_JOBS = 'filter-jobs',
  SET_FAVORITE = 'set-favorite',
  UPDATE_FILTER_TERMS = 'update-filter-terms'
}

type FilterListActions = {
  jobsArr?: JobProps[];
  filter?: FilterState;
  id?: string;
  favorite?: boolean;
}

type FilterListAction = {
  type: ACTIONS;
  payload: FilterListActions;
}

const filterAll = 'all';

let filterListPosition: string[] = [];
let filterListRole: string[] = [];
let filterListContract: string[] = [];
let filterListCity : string[] = [];
let filterListRegion : string[] = [];
let filterListCountry : string[] = [];


function InitFilters(jobsArray: JobProps[]): void {
  filterListPosition = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.position.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterListRole = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.role.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterListContract = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.contract.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterListCity = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.city.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterListRegion = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.region.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
  filterListCountry = [filterAll, ...Array.from(new Set(jobsArray.map(job => job.country.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))];
}

function reducer(state: State, action: FilterListAction): State {
  switch (action.type) {
    case ACTIONS.SET_JOBS:
      InitFilters(action.payload.jobsArr ?? []);
      return {
        ...state,
        jobsArr: [...(action.payload.jobsArr ?? [])]
      };
    case ACTIONS.FILTER_JOBS: // This is not used yet
      {
        let filteredJobs;
        const filter = action.payload.filter;
        if(filter) {
          filteredJobs = (!action.payload.filter?.filterPosition || action.payload.filter?.filterPosition === filterAll) ? state.jobsArr: state.jobsArr.filter((job) => job.position.toLowerCase().includes(filter.filterPosition.toLowerCase()));
          filteredJobs = (!action.payload.filter?.filterRole || action.payload.filter?.filterRole === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.role.toLowerCase().includes(filter.filterRole.toLowerCase()));
          filteredJobs = (!action.payload.filter?.filterContract || action.payload.filter?.filterContract === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.contract.toLowerCase().includes(filter.filterContract.toLowerCase()));
          filteredJobs = (!action.payload.filter?.filterCity || action.payload.filter?.filterCity === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.city.toLowerCase().includes(filter.filterCity.toLowerCase()));
          filteredJobs = (!action.payload.filter?.filterRegion || action.payload.filter?.filterRegion === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.region.toLowerCase().includes(filter.filterRegion.toLowerCase()));
          filteredJobs = (!action.payload.filter?.filterCountry || action.payload.filter?.filterCountry === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.country.toLowerCase().includes(filter.filterCountry?.toLowerCase()));
          filteredJobs = filteredJobs.filter(job => job.headline?.toLowerCase().includes(filter.filterHeadline?.toLowerCase()));
        }
        return {
          ...state,
          filteredJobsArr: [...(filteredJobs ?? [])]
        };
      }
    case ACTIONS.SET_FAVORITE:
      const job: (JobProps | undefined) = state.jobsArr?.find(job => job.id === action.payload.id);
      if(job) {
        job.favorite = action.payload.favorite!;
        if (action.payload.favorite) {
          addLocalStorageFavorites(job);
        } else {
          removeLocalStorageFavorites(job);
        }
      }
      return {
        ...state,
        jobsArr: [...state.jobsArr]
      };
    case ACTIONS.UPDATE_FILTER_TERMS:  // This is not used yet
      {
        const filter = action.payload.filter;
        if(filter) 
        {
          filterListPosition = ((filter.filterPosition === "") || (filter.filterPosition === filterAll)) ? [filterAll, ...Array.from(new Set((action.payload.jobsArr ?? []).map((job: JobProps) => job.position.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))] : filterListPosition;
          filterListRole = ((filter.filterRole === "") || (filter.filterRole === filterAll)) ? [filterAll, ...Array.from(new Set((action.payload.jobsArr ?? []).map((job: JobProps) => job.role.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))] : filterListRole;
          filterListContract = ((filter.filterContract === "") || (filter.filterContract === filterAll)) ? [filterAll, ...Array.from(new Set((action.payload.jobsArr ?? []).map((job: JobProps) => job.contract.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))] : filterListContract;
          filterListCity = ((filter.filterCity === "") || (filter.filterCity === filterAll)) ? [filterAll, ...Array.from(new Set((action.payload.jobsArr ?? []).map((job: JobProps) => job.city.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))] : filterListCity;
          filterListRegion = ((filter.filterRegion === "") || (filter.filterRegion === filterAll)) ? [filterAll, ...Array.from(new Set((action.payload.jobsArr ?? []).map((job: JobProps) => job.region.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))] : filterListRegion;
          filterListCountry = ((filter.filterCountry === "") || (filter.filterCountry === filterAll)) ? [filterAll, ...Array.from(new Set((action.payload.jobsArr ?? []).map((job: JobProps) => job.country.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))] : filterListCountry;
        } 
        return state;
      }
    default:
      return state;
  }
}

// Filter Reducer

type FilterState = {
  filterPosition: string;
  filterRole: string;
  filterContract: string;
  filterCity: string;
  filterRegion: string;
  filterCountry: string;
  filterHeadline: string;
}

enum FILTER_ACTIONS {
  SET_FILTER_POSITION = 'set-filter-position',
  SET_FILTER_ROLE = 'set-filter-role',
  SET_FILTER_CONTRACT = 'set-filter-contract',
  SET_FILTER_CITY = 'set-filter-city',
  SET_FILTER_REGION = 'set-filter-region',
  SET_FILTER_COUNTRY = 'set-filter-country',
  SET_FILTER_HEADLINE = 'set-filter-headline'
}

type FilterAction = {
  type: FILTER_ACTIONS;
  payload: string;
}

function filterReducer(filter: FilterState, action:  FilterAction): FilterState {
  switch (action.type) {
    case FILTER_ACTIONS.SET_FILTER_POSITION:
      return { ...filter,
        filterPosition: action.payload ?? ''
      };
    case FILTER_ACTIONS.SET_FILTER_ROLE:
      return { ...filter,
        filterRole: action.payload ?? ''
      };
    case FILTER_ACTIONS.SET_FILTER_CONTRACT:
      return { ...filter,
        filterContract: action.payload ?? ''
      };
    case FILTER_ACTIONS.SET_FILTER_CITY:
      return { ...filter,
        filterCity: action.payload ?? ''
      };
    case FILTER_ACTIONS.SET_FILTER_REGION:
      return { ...filter,
        filterRegion: action.payload ?? ''
      };
    case FILTER_ACTIONS.SET_FILTER_COUNTRY:
      return { ...filter,
        filterCountry: action.payload ?? ''
      };
    case FILTER_ACTIONS.SET_FILTER_HEADLINE:
      return { ...filter,
        filterHeadline: action.payload ?? ''
      };
    default:
    return filter;
  }
}

function applyFilters(jobsArr: JobProps[], filter:FilterState): JobProps[] {
  let filteredJobs = (!filter.filterPosition || filter.filterPosition === filterAll) ? jobsArr: jobsArr.filter((job) => job.position.toLowerCase().includes(filter.filterPosition.toLowerCase()));
  filteredJobs = (!filter.filterRole || filter.filterRole === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.role.toLowerCase().includes(filter.filterRole.toLowerCase()));
  filteredJobs = (!filter.filterContract || filter.filterContract === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.contract.toLowerCase().includes(filter.filterContract.toLowerCase()));
  filteredJobs = (!filter.filterCity || filter.filterCity === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.city.toLowerCase().includes(filter.filterCity.toLowerCase()));
  filteredJobs = (!filter.filterRegion || filter.filterRegion === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.region.toLowerCase().includes(filter.filterRegion.toLowerCase()));
  filteredJobs = (!filter.filterCountry || filter.filterCountry === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.country.toLowerCase().includes(filter.filterCountry.toLowerCase()));

  return filteredJobs.filter(job => job.headline?.toLowerCase().includes(filter.filterHeadline.toLowerCase()));
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { 
    jobsArr: [],
    filteredJobsArr: []
  });
  const [filter, dispatchFilter] = useReducer(filterReducer, { 
    filterPosition: '', 
    filterRole: '', 
    filterContract: '', 
    filterCity: '', 
    filterRegion: '', 
    filterCountry: '',
    filterHeadline: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
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


  useEffect(() => {
    let jobsArr: JobProps[] = [];

    function ParseData(data: JobData): JobProps {
      const job: JobProps = {
        id: data.id,
        SetFavoriteClickedEvent: (id: string, favorite: boolean) => dispatch({type: ACTIONS.SET_FAVORITE, payload: { id: id, favorite: favorite }}),
        favorite: false,
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
          const dataObj = await fetchJobs(`https://jobsearch.api.jobtechdev.se/search?offset=${pageNum*pageSize}&limit=${pageSize}&remote=true`);
          totCount = dataObj?.total.value ?? 0;
          jobsArr = jobsArr.concat(dataObj?.hits.map((job:JobData) => ParseData(job)) ?? []);
          jobsArr.forEach(job => job.favorite = favoriteJobs.some(favJob => favJob.id === job.id));
          dispatch({type: ACTIONS.SET_JOBS, payload: {jobsArr: jobsArr}});
          pageNum++;
        } while (pageNum*pageSize < totCount);
        jobsArrGlobal = [...jobsArr];
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    function InitGlobalData(): void {
      const favoriteJobs = readLocalStorageFavorites();
      jobsArrGlobal.forEach(job => job.favorite = favoriteJobs.some(favJob => favJob.id === job.id));
      jobsArrGlobal.forEach((job) => job.SetFavoriteClickedEvent = (id: string, favorite: boolean) => dispatch({type: ACTIONS.SET_FAVORITE, payload: { id: id, favorite: favorite }}));
      dispatch({type: ACTIONS.SET_JOBS, payload: {jobsArr: jobsArrGlobal}});
    }

    // Don't fetch data from API if we already have it
    if(jobsArrGlobal.length === 0){
      FetchData();
    } else {
      try {
        setIsLoading(true);
        InitGlobalData();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    
  }, []);

  const filteredJobs = applyFilters(state.jobsArr, filter);

  // Perhaps we should re-run InitFilters(jobsArrGlobal) when the filters change, but for now we'll just re-run the filtering

  return (
    <>
      <details style={themeStyles} className={styles.searchContainer}>
        <summary className={styles.summary}>Filters</summary>
        <article className={styles.filtersContainer}>
          <ComboBox filterTitle="Position" filterTerms={filterListPosition} handleSelect={(value:string) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_POSITION, payload: value })}/>
          <ComboBox filterTitle="Role" filterTerms={filterListRole} handleSelect={(value:string) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_ROLE, payload: value })}/>
          <ComboBox filterTitle="Contract Type" filterTerms={filterListContract} handleSelect={(value:string) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_CONTRACT, payload: value })}/>
          <ComboBox filterTitle="City" filterTerms={filterListCity} handleSelect={(value:string) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_CITY, payload: value })}/>
          <ComboBox filterTitle="Region" filterTerms={filterListRegion} handleSelect={(value:string) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_REGION, payload: value })}/>
          <ComboBox filterTitle="Country" filterTerms={filterListCountry} handleSelect={(value:string) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_COUNTRY, payload: value })}/>
        </article>
        <SearchBar searchTerm={filter.filterHeadline} searchContext={"'Headline'"} handleChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatchFilter({type: FILTER_ACTIONS.SET_FILTER_HEADLINE, payload: e.target.value })}/>
      </details>
      <main className={styles.main} style={themeStyles}>
        <JobList jobsArr={filteredJobs}/>
        {isLoading && <div style={themeStyles} className={styles.spinnerCircular}><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p className={styles.spinnerLabel}>Loading...</p></div>}
      </main>
    </>
  )
}
