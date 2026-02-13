import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../../favorites/store/favorites.actions';
import { isFavorite, selectFavoriteBySlug } from '../../../favorites/store/favorites.selectors';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

import { FavoriteOffer } from '../../../favorites/store/favorites.state';

@Component({
    selector: 'app-job-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.css'
})
export class JobCardComponent implements OnInit {
    @Input({ required: true }) job!: Job;
    @Input() isLoggedIn: boolean = false;

    private store = inject(Store);
    private authService = inject(AuthService);

    isFavorite$!: Observable<boolean>;

    private currentFavorite$: Observable<FavoriteOffer | undefined> | undefined;

    ngOnInit(): void {
        this.isFavorite$ = this.store.select(isFavorite(this.job.slug));
        this.currentFavorite$ = this.store.select(selectFavoriteBySlug(this.job.slug));
    }

    onAddToFavorites(): void {
        const user = this.authService.currentUser();
        if (!user || !user.id) return;

        this.currentFavorite$?.pipe(take(1)).subscribe(existingFav => {
            if (existingFav && (existingFav as any).id) {
                this.store.dispatch(removeFavorite({ id: (existingFav as any).id }));
            } else {
                this.store.dispatch(addFavorite({ job: this.job, userId: user.id }));
            }
        });
    }

    onTrackApplication(): void {
        console.log('Track application for:', this.job.slug);
    }
}
