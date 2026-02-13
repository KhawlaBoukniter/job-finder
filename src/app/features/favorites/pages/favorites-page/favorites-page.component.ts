import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadFavorites } from '../../store/favorites.actions';
import { selectFavoritesAsJobs, selectIsLoading, selectError } from '../../store/favorites.selectors';
import { AuthService } from '../../../../core/services/auth.service';
import { JobCardComponent } from '../../../jobs/components/job-card/job-card.component';
import { Job } from '../../../jobs/models/job.model';

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

    favorites$: Observable<Job[]> = this.store.select(selectFavoritesAsJobs);
    isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
    error$: Observable<string | null> = this.store.select(selectError);

    ngOnInit(): void {
        const user = this.authService.currentUser();
        if (user && user.id) {
            this.store.dispatch(loadFavorites({ userId: user.id }));
        }
    }
}
