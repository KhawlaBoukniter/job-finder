import { createAction, props } from '@ngrx/store';
import { FavoriteOffer } from './favorites.state';
import { Job } from '../../jobs/models/job.model';

export const loadFavorites = createAction(
    '[Favorites Page] Load Favorites',
    props<{ userId: string }>()
);

export const loadFavoritesSuccess = createAction(
    '[Favorites API] Load Favorites Success',
    props<{ favorites: FavoriteOffer[] }>()
);

export const loadFavoritesFailure = createAction(
    '[Favorites API] Load Favorites Failure',
    props<{ error: string }>()
);

export const addFavorite = createAction(
    '[Job Card] Add Favorite',
    props<{ job: Job; userId: string }>()
);

export const addFavoriteSuccess = createAction(
    '[Favorites API] Add Favorite Success',
    props<{ favorite: FavoriteOffer }>()
);

export const addFavoriteFailure = createAction(
    '[Favorites API] Add Favorite Failure',
    props<{ error: string }>()
);

export const removeFavorite = createAction(
    '[Favorites Page] Remove Favorite',
    props<{ id: number | string }>()
);

export const removeFavoriteSuccess = createAction(
    '[Favorites API] Remove Favorite Success',
    props<{ id: number | string }>()
);

export const removeFavoriteFailure = createAction(
    '[Favorites API] Remove Favorite Failure',
    props<{ error: string }>()
);
