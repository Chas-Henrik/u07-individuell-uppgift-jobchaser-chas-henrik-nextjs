import {JobProps} from '@/components/Job';

export function readLocalStorage(name: string): JobProps[] {
    const lsData = localStorage.getItem(name);
    return lsData ? JSON.parse(lsData) : [];
}

export function writeLocalStorage(name: string, dataObj: JobProps[]) {
    localStorage.setItem(name, JSON.stringify(dataObj));
}
