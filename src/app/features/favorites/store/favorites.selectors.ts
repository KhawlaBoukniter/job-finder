import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';
import { Job } from '../../jobs/models/job.model';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
    selectFavoritesState,
    (state) => state.favorites
);

export const selectIsLoading = createSelector(
    selectFavoritesState,
    (state) => state.isLoading
);

export const selectError = createSelector(
    selectFavoritesState,
    (state) => state.error
);

export const isFavorite = (slug: string) => createSelector(
    selectAllFavorites,
    (favorites) => favorites.some(job => job.offerId === slug)
);

export const selectFavoriteBySlug = (slug: string) => createSelector(
    selectAllFavorites,
    (favorites) => favorites.find(job => job.offerId === slug)
);

export const selectFavoritesAsJobs = createSelector(
    selectAllFavorites,
    (favorites): Job[] => favorites.map(fav => ({
        slug: fav.offerId,
        company_name: fav.company,
        title: fav.title,
        description: '',
        remote: false,
        url: fav.url,
        tags: [],
        job_types: [],
        location: fav.location,
        created_at: 0,
        id: fav.id
    } as any as Job))
);
