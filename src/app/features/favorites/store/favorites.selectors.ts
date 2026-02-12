import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

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

// Selector to check if a specific job slug is in favorites
export const isFavorite = (slug: string) => createSelector(
    selectAllFavorites,
    (favorites) => favorites.some(job => job.slug === slug)
);
