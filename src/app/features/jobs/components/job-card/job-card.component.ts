import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../../favorites/store/favorites.actions';
import { isFavorite, selectFavoriteBySlug } from '../../../favorites/store/favorites.selectors';
import { Observable, take, map, of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

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

    @Output() apply = new EventEmitter<Job>();

    private store = inject(Store);
    private authService = inject(AuthService);
    private router = inject(Router);

    isFavorite$: Observable<boolean> = of(false);
    private currentFavorite$ = this.store.select(selectFavoriteBySlug(this.job.slug)); // Will be initialized in ngOnInit properly if needed, but here simple init

    ngOnInit(): void {
        this.currentFavorite$ = this.store.select(selectFavoriteBySlug(this.job.slug));
        this.isFavorite$ = this.store.select(isFavorite(this.job.slug));
    }

    onAddToFavorites(): void {
        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
            return;
        }

        this.currentFavorite$.pipe(take(1)).subscribe(existingFav => {
            if (existingFav && (existingFav as any).id) {
                this.store.dispatch(removeFavorite({ id: (existingFav as any).id }));
            } else {
                this.store.dispatch(addFavorite({ job: this.job, userId: this.authService.currentUser()!.id }));
            }
        });
    }

    onTrackApplication(): void {
        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
            return;
        }
        this.apply.emit(this.job);
    }
}
