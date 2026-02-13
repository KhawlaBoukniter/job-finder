import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../services/applications.service';
import { AuthService } from '../../../core/services/auth.service';
import { ApplicationItem } from '../models/application.model';
import { RouterLink } from '@angular/router';
import { ApplicationCardComponent } from '../components/application-card/application-card.component';

@Component({
    selector: 'app-applications-page',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './applications.component.html'
})
export class ApplicationsPageComponent implements OnInit {
    applications: ApplicationItem[] = [];
    isLoading = true;

    private applicationsService = inject(ApplicationsService);
    private authService = inject(AuthService);

    ngOnInit(): void {
        const user = this.authService.currentUser();
        if (user && user.id) {
            this.applicationsService.getUserApplications(user.id).subscribe({
                next: (apps) => {
                    this.applications = apps;
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Error loading applications:', err);
                    this.isLoading = false;
                }
            });
        } else {
            this.isLoading = false;
        }
    }
}
