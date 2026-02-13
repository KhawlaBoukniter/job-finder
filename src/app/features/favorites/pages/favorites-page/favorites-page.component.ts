import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../store/favorites.state';
import { loadFavorites, removeFavorite } from '../../store/favorites.actions';
import { selectAllFavorites, selectIsLoading, selectError } from '../../store/favorites.selectors';
import { AuthService } from '../../../../core/services/auth.service';
import { JobCardComponent } from '../../../jobs/components/job-card/job-card.component';

@Component({
    selector: 'app-favorites-page',
    standalone: true,
    imports: [CommonModule, JobCardComponent],
    templateUrl: './favorites-page.component.html',
    styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {
    private store = inject(Store);
    private authService = inject(AuthService);

    favorites$: Observable<Favorite[]> = this.store.select(selectAllFavorites);
    isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
    error$: Observable<string | null> = this.store.select(selectError);

    ngOnInit(): void {
        const user = this.authService.currentUser();
        if (user && user.id) {
            this.store.dispatch(loadFavorites({ userId: user.id }));
        }
    }

    onRemove(id: any): void {
        this.store.dispatch(removeFavorite({ id }));
    }
}
