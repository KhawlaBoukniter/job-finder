import { Job } from '../../jobs/models/job.model';

export interface FavoriteOffer {
    id?: number | string;
    userId: string;
    offerId: string;
    title: string;
    company: string;
    location: string;
    url: string;
    created_at: number;
}

export interface FavoritesState {
    favorites: FavoriteOffer[];
    isLoading: boolean;
    error: string | null;
}

export const initialFavoritesState: FavoritesState = {
    favorites: [],
    isLoading: false,
    error: null
};
