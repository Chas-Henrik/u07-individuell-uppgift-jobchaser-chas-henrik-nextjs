
export type ApiJobData = {
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

export type ApiJobType = { 
    total: { value: number }, 
    hits: ApiJobData[] 
}

export type JobType = {
    id: string;
    favorite: boolean;
    logo_url: string;
    employer:  string;
    headline: string;
    position: string;
    role: string;
    posted: string;
    expires: string;
    contract: string;
    city: string;
    region: string;
    country: string;
    url: string;
}

