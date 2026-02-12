import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as FavoritesActions from './favorites.actions';
import { Favorite } from './favorites.state';
import { selectAllFavorites } from './favorites.selectors';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FavoritesEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private store = inject(Store);
    private apiUrl = 'http://localhost:3000/favoritesOffers'; 

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.loadFavorites),
            mergeMap(({ userId }) =>
                this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}`).pipe(
                    map((favorites) => FavoritesActions.loadFavoritesSuccess({ favorites })),
                    catchError((error) =>
                        of(FavoritesActions.loadFavoritesFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    addFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.addFavorite),
            withLatestFrom(this.store.select(selectAllFavorites)),
            mergeMap(([{ job, userId }, favorites]) => {
                const isAlreadyFavorite = favorites.some((f) => f.slug === job.slug);

                if (isAlreadyFavorite) {
                    const existing = favorites.find((f) => f.slug === job.slug);
                    if (existing) return of(FavoritesActions.addFavoriteSuccess({ favorite: existing }));
                }

                const newFavorite: Favorite = { ...job, userId };
                return this.http.post<Favorite>(this.apiUrl, newFavorite).pipe(
                    map((favorite) => FavoritesActions.addFavoriteSuccess({ favorite })),
                    catchError((error) =>
                        of(FavoritesActions.addFavoriteFailure({ error: error.message }))
                    )
                );
            })
        )
    );

    removeFavorite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavoritesActions.removeFavorite),
            mergeMap(({ id }) =>
                this.http.delete(`${this.apiUrl}/${id}`).pipe(
                    map(() => FavoritesActions.removeFavoriteSuccess({ id })),
                    catchError((error) =>
                        of(FavoritesActions.removeFavoriteFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}
