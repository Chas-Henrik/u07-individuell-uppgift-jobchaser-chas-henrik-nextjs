import {JobProps} from '@/components/Job';

const LOCAL_STORAGE_KEY = "u07-jobchaser-chas-henrik-nextjs : favorites";

export function readLocalStorageFavorites(): JobProps[] {
    const lsData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return lsData ? JSON.parse(lsData) : [];
}

export function writeLocalStorageFavorites(dataObj: JobProps[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataObj));
}

export function addLocalStorageFavorites(dataObj: JobProps) {
    const favorites = readLocalStorageFavorites()
    const isInFavorites = favorites.find(job => job.id === dataObj.id);
    if (!isInFavorites) {
        favorites.push(dataObj);
        writeLocalStorageFavorites(favorites);
    }
}
    
export function removeLocalStorageFavorites(dataObj: JobProps) {
    const favorites = readLocalStorageFavorites()
    const newFavorites = favorites.filter(job => job.id !== dataObj.id);
    writeLocalStorageFavorites(newFavorites);
}
