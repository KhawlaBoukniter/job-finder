import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../../services/applications.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ApplicationItem } from '../../models/application.model';
import { RouterLink } from '@angular/router';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';

@Component({
    selector: 'app-applications-page',
    standalone: true,
    imports: [CommonModule, RouterLink, ApplicationCardComponent],
    template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-zinc-900 mb-8">Mes Candidatures</h1>

      @if (isLoading) {
        <div class="flex justify-center p-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      } @else if (applications.length === 0) {
        <div class="text-center py-12 bg-zinc-50 rounded-lg border border-zinc-200">
          <svg class="mx-auto h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-zinc-900">Aucune candidature suivie</h3>
          <p class="mt-1 text-sm text-zinc-500">Commencez par rechercher des offres et suivez vos candidatures ici.</p>
          <div class="mt-6">
            <a routerLink="/jobs" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Voir les offres
            </a>
          </div>
        </div>
      } @else {
        <div class="space-y-4">
          @for (app of applications; track app.id) {
             <app-application-card 
                [application]="app" 
                (delete)="onDelete($event)">
             </app-application-card>
          }
        </div>
      }
    </div>
  `
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
        this.applicationsService.deleteApplication(id).subscribe({
            next: () => {
                this.applications = this.applications.filter(a => a.id !== id);
            },
            error: (err) => console.error('Error deleting application:', err)
        });
    }
}
