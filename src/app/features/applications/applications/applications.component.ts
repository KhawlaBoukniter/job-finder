import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../services/applications.service';
import { AuthService } from '../../../core/services/auth.service';
import { ApplicationItem, ApplicationStatus } from '../models/application.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-applications-page',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
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

  onDelete(id: number | string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce suivi ?')) {
      this.applicationsService.deleteApplication(id).subscribe({
        next: () => {
          this.applications = this.applications.filter(a => a.id !== id);
        },
        error: (err) => console.error('Error deleting application:', err)
      });
    }
  }

  onStatusChange(id: number | string, newStatus: ApplicationStatus) {
    const app = this.applications.find(a => a.id === id);
    if (app) {
      const oldStatus = app.status;
      app.status = newStatus;

      this.applicationsService.updateApplication(id, { status: newStatus }).subscribe({
        error: (err) => {
          console.error('Error updating status:', err);
          app.status = oldStatus;
        }
      });
    }
  }
}
