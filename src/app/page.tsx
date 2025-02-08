'use client'

import './Home.css'
import { SpinnerCircular } from 'spinners-react';
import {JobProps} from './components/Job'
import JobList from './components/JobList'
import SearchBar from './components/SearchBar'
import { ComboBox } from './components/ComboBox'
import SwitchBox from "@/components/SwitchBox"
import Footer from './components/Footer';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from "@/layout";
import { ThemeUpdateContext } from "@/layout";

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

function ParseData(data: JobData): JobProps {
  const job: JobProps = {
    id: data.id,
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

export default function Home() {
  const filterAll = 'alla';
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
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
  const darkTheme = useContext(ThemeContext);
  const toggleTheme = useContext(ThemeUpdateContext);

  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#f5f5f5',
    color: darkTheme ? '#f5f5f5' : '#333',
  };

  const handleCheckedChange = (value: boolean) => {
    setSwitchChecked(value);
    toggleTheme();
  };


  useEffect(() => {
    async function fetchData(): Promise<void> {
      let pageNum = 0;
      const pageSize = 100;
      let totCount = 0;
      let jobsArr: JobProps[] = [];

      try {
        setIsLoading(true);
        do {
            const dataObj = await fetchJobs(`https://jobsearch.api.jobtechdev.se/search?offset=${pageNum*pageSize}&limit=${pageSize}&remote=true`);
            totCount = dataObj?.total.value ?? 0;
            jobsArr = jobsArr.concat(dataObj?.hits.map((job:JobData) => ParseData(job)) ?? []);
            setAllJobs( jobsArr );
            pageNum++;
        } while (pageNum*pageSize < totCount);
      } catch (error) {
        console.error(error);
      } finally {
        setFilterPosition([filterAll, ...Array.from(new Set(jobsArr.map(job => job.position.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterRole([filterAll, ...Array.from(new Set(jobsArr.map(job => job.role.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterContract([filterAll, ...Array.from(new Set(jobsArr.map(job => job.contract.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterCity([filterAll, ...Array.from(new Set(jobsArr.map(job => job.city.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterRegion([filterAll, ...Array.from(new Set(jobsArr.map(job => job.region.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterCountry([filterAll, ...Array.from(new Set(jobsArr.map(job => job.country.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setIsLoading(false);
      }
    }

    fetchData();
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
      <header style={themeStyles}>
        <article className="searchContainer">
          <article className="filtersContainer">
            <ComboBox filterTitle="Position" filterTerms={filterPosition} handleSelect={handleFilterPositionSelect}/>
            <ComboBox filterTitle="Role" filterTerms={filterRole} handleSelect={handleFilterRoleSelect}/>
            <ComboBox filterTitle="Contract Type" filterTerms={filterContract} handleSelect={handleFilterContractSelect}/>
            <ComboBox filterTitle="City" filterTerms={filterCity} handleSelect={handleFilterCitySelect}/>
            <ComboBox filterTitle="Region" filterTerms={filterRegion} handleSelect={handleFilterRegionSelect}/>
            <ComboBox filterTitle="Country" filterTerms={filterCountry} handleSelect={handleFilterCountrySelect}/>
          </article>
          <SearchBar searchTerm={searchTerm} searchContext={"'Headline'"} handleChange={handleSearch}/>
        </article>
        <SwitchBox status={["Dark/light-mode", "Dark/light-mode"]} checked={switchChecked} onCheckedChange={handleCheckedChange} />
      </header>
      <main style={themeStyles}>
        <JobList jobsArr={searchedJobs}/>
        {isLoading && <div className="spinner-circular"><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p>Loading...</p></div>}
      </main>
      <Footer>Test</Footer>
    </>
  )
}
