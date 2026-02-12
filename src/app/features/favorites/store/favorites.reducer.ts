import { createReducer, on } from '@ngrx/store';
import { initialFavoritesState } from './favorites.state';
import * as FavoritesActions from './favorites.actions';

export const favoritesReducer = createReducer(
    initialFavoritesState,

    on(FavoritesActions.loadFavorites, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
        ...state,
        favorites,
        isLoading: false
    })),
    on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(FavoritesActions.addFavorite, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(FavoritesActions.addFavoriteSuccess, (state, { favorite }) => ({
        ...state,
        favorites: [...state.favorites, favorite],
        isLoading: false
    })),
    on(FavoritesActions.addFavoriteFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(FavoritesActions.removeFavorite, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(FavoritesActions.removeFavoriteSuccess, (state, { id }) => ({
        ...state,
        favorites: state.favorites.filter(f => (f as any).id !== id), // Using 'any' cast if id property is not explicit in Favorite type but present in runtime/JSON server
        isLoading: false
    })),
    on(FavoritesActions.removeFavoriteFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);
