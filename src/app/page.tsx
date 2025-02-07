'use client'

import './Home.css'
import { SpinnerCircular } from 'spinners-react';
import { useState, useEffect } from 'react';
import {JobProps} from '../components/Job'
import JobList from '../components/JobList'
import SearchBar from '../components/SearchBar'
import { ComboBox } from '../components/ComboBox'
import SwitchBox from "@/components/SwitchBox"

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

export default function Home() {
  const filterAll = 'alla';
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [allJobs, setAllJobs] = useState<JobProps[]>([]);
  const [filterPosition, setFilterPosition] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [filterContractTerms, setFilterContractTerms] = useState<string[]>([]);
  const [selectedContractTerm, setSelectedContractTerm] = useState<string>('');
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
  const handleFilterContractSelect = (value: string) => setSelectedContractTerm(value);
  const handleFilterCitySelect = (value: string) => setSelectedCity(value);
  const handleFilterRegionSelect = (value: string) => setSelectedRegion(value);
  const handleFilterCountrySelect = (value: string) => setSelectedCountry(value);
  const handleCheckedChange = (value: boolean) => setLoggedIn(value);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      let pageNum = 0;
      const pageSize = 100;
      let totCount = 0;
      const dataArr: JobProps[] = [];

      try {
        setIsLoading(true);
        do {
            const dataObj = await fetchJobs(`https://jobsearch.api.jobtechdev.se/search?offset=${pageNum*pageSize}&limit=${pageSize}&remote=true`);
            const data:JobProps[] = dataObj?.hits;
            totCount = dataObj?.total.value;
            dataArr.push(...data);
            setAllJobs( [...dataArr] );
            pageNum++;
        } while (pageNum*pageSize < totCount);
      } catch (error) {
        console.error(error);
      } finally {
        setFilterPosition([filterAll, ...Array.from(new Set(dataArr.map(job => job.occupation_group.label && job.occupation_group.label.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterRole([filterAll, ...Array.from(new Set(dataArr.map(job => job.occupation.label && job.occupation.label.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterContractTerms([filterAll, ...Array.from(new Set(dataArr.map(job => job.employment_type.label && job.employment_type.label.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterCity([filterAll, ...Array.from(new Set(dataArr.map(job => job.workplace_address.city && job.workplace_address.city.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterRegion([filterAll, ...Array.from(new Set(dataArr.map(job => job.workplace_address.region && job.workplace_address.region.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setFilterCountry([filterAll, ...Array.from(new Set(dataArr.map(job => job.workplace_address.country && job.workplace_address.country.toLowerCase()))).filter((term): term is string => term !== null).sort((a, b) => a.localeCompare(b))]);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  let filteredJobs = (!selectedPosition || selectedPosition === filterAll) ? allJobs: allJobs.filter((job) => job.occupation_group.label?.toLowerCase().includes(selectedPosition.toLowerCase()));
  filteredJobs = (!selectedRole || selectedRole === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.occupation.label?.toLowerCase().includes(selectedRole.toLowerCase()));
  filteredJobs = (!selectedContractTerm || selectedContractTerm === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.employment_type.label?.toLowerCase().includes(selectedContractTerm.toLowerCase()));
  filteredJobs = (!selectedCity || selectedCity === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.workplace_address.city?.toLowerCase().includes(selectedCity.toLowerCase()));
  filteredJobs = (!selectedRegion || selectedRegion === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.workplace_address.region?.toLowerCase().includes(selectedRegion.toLowerCase()));
  filteredJobs = (!selectedCountry || selectedCountry === filterAll) ? filteredJobs: filteredJobs.filter((job) => job.workplace_address.country?.toLowerCase().includes(selectedCountry.toLowerCase()));

  const searchedJobs = filteredJobs.filter(job => job.headline?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <header>
        <article className="searchContainer">
          <article className="filtersContainer">
            <ComboBox filterTitle="Position" filterTerms={filterPosition} handleSelect={handleFilterPositionSelect}/>
            <ComboBox filterTitle="Role" filterTerms={filterRole} handleSelect={handleFilterRoleSelect}/>
            <ComboBox filterTitle="Contract Type" filterTerms={filterContractTerms} handleSelect={handleFilterContractSelect}/>
            <ComboBox filterTitle="City" filterTerms={filterCity} handleSelect={handleFilterCitySelect}/>
            <ComboBox filterTitle="Region" filterTerms={filterRegion} handleSelect={handleFilterRegionSelect}/>
            <ComboBox filterTitle="Country" filterTerms={filterCountry} handleSelect={handleFilterCountrySelect}/>
          </article>
          <SearchBar searchTerm={searchTerm} searchContext={"'Headline'"} handleChange={handleSearch}/>
        </article>
        <SwitchBox status={["Logged Out", "Logged In"]} checked={loggedIn} onCheckedChange={handleCheckedChange} />
      </header>
      <main>
        <JobList jobsArr={searchedJobs}/>
        {isLoading && <div className="spinner-circular"><SpinnerCircular size="15rem" thickness={250} speed={100}  color="#0000FF" /><p>Loading...</p></div>}
      </main>
    </>
  )
}
