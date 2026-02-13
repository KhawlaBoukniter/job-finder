import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { Store } from '@ngrx/store';
import { addFavorite } from '../../../favorites/store/favorites.actions';
import { isFavorite } from '../../../favorites/store/favorites.selectors';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

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

    ngOnInit(): void {
        this.isFavorite$ = this.store.select(isFavorite(this.job.slug));
    }

    onAddToFavorites(): void {
        const user = this.authService.currentUser();
        if (user && user.id) {
            this.store.dispatch(addFavorite({ job: this.job, userId: user.id }));
        }
    }

    onTrackApplication(): void {
        console.log('Track application for:', this.job.slug);
    }
}
