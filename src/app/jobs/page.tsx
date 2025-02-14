'use client'

import styles from './Jobs.module.css';
import { useEffect, useState, useContext } from 'react';
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

export default function Home() {
  const filterAll = 'all';
  const [allJobs, setAllJobs] = useState<JobProps[]>([]);
  const [filterPosition, setFilterPosition] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [filterContract, setFilterContract] = useState<string[]>([]);
  const [selectedContract, setSelectedContract] = useState<string>('');
  const [filterCity, setFilterCity] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFilterPositionSelect = (value: string) => setSelectedPosition(value);
  const handleFilterRoleSelect = (value: string) => setSelectedRole(value);
  const handleFilterContractSelect = (value: string) => setSelectedContract(value);
  const handleFilterCitySelect = (value: string) => setSelectedCity(value);
  const handleFilterRegionSelect = (value: string) => setSelectedRegion(value);
  const handleFilterCountrySelect = (value: string) => setSelectedCountry(value);
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

  const SetFavoriteEvent = (id: string, favorite: boolean) => {

    setAllJobs((prevJobs) => {
      const job: (JobProps | undefined) = prevJobs.find(job => job.id === id);
      if (job) {
        job.favorite = favorite;
        if (favorite) {
          addLocalStorageFavorites(job);
        } else {
          removeLocalStorageFavorites(job);
        }
      }
      return [...prevJobs];
    });
  }

  useEffect(() => {
    let jobsArr: JobProps[] = [];

    function ParseData(data: JobData): JobProps {
      const job: JobProps = {
        id: data.id,
        SetFavoriteClickedEvent: SetFavoriteEvent,
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

    function InitFilters() {
      setFilterPosition([filterAll, ...Array.from(new Set(jobsArrGlobal.map(job => job.position.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))]);
      setFilterRole([filterAll, ...Array.from(new Set(jobsArrGlobal.map(job => job.role.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))]);
      setFilterContract([filterAll, ...Array.from(new Set(jobsArrGlobal.map(job => job.contract.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))]);
      setFilterCity([filterAll, ...Array.from(new Set(jobsArrGlobal.map(job => job.city.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))]);
      setFilterRegion([filterAll, ...Array.from(new Set(jobsArrGlobal.map(job => job.region.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))]);
      setFilterCountry([filterAll, ...Array.from(new Set(jobsArrGlobal.map(job => job.country.toLowerCase()))).filter((term): term is string => term !== null && term !== '').sort((a, b) => a.localeCompare(b))]);
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
          setAllJobs(jobsArr);
          pageNum++;
        } while (pageNum*pageSize < totCount);
        jobsArrGlobal = [...jobsArr];
      } catch (error) {
        console.error(error);
      } finally {
        InitFilters();
        setIsLoading(false);
      }
    }

    function InitGlobalData(): void {
      const favoriteJobs = readLocalStorageFavorites();
      jobsArrGlobal.forEach(job => job.favorite = favoriteJobs.some(favJob => favJob.id === job.id));
      jobsArrGlobal.forEach((job) => job.SetFavoriteClickedEvent = SetFavoriteEvent);
      setAllJobs([...jobsArrGlobal]);
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
        InitFilters();
        setIsLoading(false);
      }
    }
    
  }, []);

  let filteredJobs = (!selectedPosition || selectedPosition === filterAll) ? allJobs: allJobs.filter((job) => job.position.toLowerCase().includes(selectedPosition.toLowerCase()));
  filteredJobs = (!selectedRole || selectedRole === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.role.toLowerCase().includes(selectedRole.toLowerCase()));
  filteredJobs = (!selectedContract || selectedContract === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.contract.toLowerCase().includes(selectedContract.toLowerCase()));
  filteredJobs = (!selectedCity || selectedCity === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.city.toLowerCase().includes(selectedCity.toLowerCase()));
  filteredJobs = (!selectedRegion || selectedRegion === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.region.toLowerCase().includes(selectedRegion.toLowerCase()));
  filteredJobs = (!selectedCountry || selectedCountry === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.country.toLowerCase().includes(selectedCountry.toLowerCase()));

  const searchedJobs = filteredJobs.filter(job => job.headline?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <details style={themeStyles} className={styles.searchContainer}>
        <summary className={styles.summary}>Filters</summary>
        <article className={styles.filtersContainer}>
          <ComboBox filterTitle="Position" filterTerms={filterPosition} handleSelect={handleFilterPositionSelect}/>
          <ComboBox filterTitle="Role" filterTerms={filterRole} handleSelect={handleFilterRoleSelect}/>
          <ComboBox filterTitle="Contract Type" filterTerms={filterContract} handleSelect={handleFilterContractSelect}/>
          <ComboBox filterTitle="City" filterTerms={filterCity} handleSelect={handleFilterCitySelect}/>
          <ComboBox filterTitle="Region" filterTerms={filterRegion} handleSelect={handleFilterRegionSelect}/>
          <ComboBox filterTitle="Country" filterTerms={filterCountry} handleSelect={handleFilterCountrySelect}/>
        </article>
        <SearchBar searchTerm={searchTerm} searchContext={"'Headline'"} handleChange={handleSearch}/>
      </details>
      <main className={styles.main} style={themeStyles}>
        <JobList jobsArr={searchedJobs}/>
        {isLoading && <div style={themeStyles} className={styles.spinnerCircular}><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p className={styles.spinnerLabel}>Loading...</p></div>}
      </main>
    </>
  )
}
