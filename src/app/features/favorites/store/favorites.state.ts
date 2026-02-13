import { Job } from '../../jobs/models/job.model';

export interface Favorite extends Job {
    userId: string;
    id?: number | string;
}

export interface FavoritesState {
    favorites: Favorite[];
    isLoading: boolean;
    error: string | null;
}

export const initialFavoritesState: FavoritesState = {
    favorites: [],
    isLoading: false,
    error: null
};
