import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ApplicationsService } from '../../../applications/services/applications.service';
import { ApplicationItem } from '../../../applications/models/application.model';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JobCardComponent],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.css'
})
export class JobsPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private jobsService = inject(JobsService);
  private authService = inject(AuthService);
  private applicationsService = inject(ApplicationsService);

  searchForm = this.fb.group({
    keyword: [''],
    location: ['']
  });

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  allJobs = signal<Job[]>([]);
  filteredJobs = signal<Job[]>([]);

  currentPage = signal<number>(1);
  pageSize = 10;

  currentUser = this.authService.currentUser;
  isLoggedInSignal = computed(() => !!this.currentUser());

  displayedJobs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredJobs().slice(start, end);
  });

  totalPages = computed(() => Math.ceil(this.filteredJobs().length / this.pageSize));

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    if (this.searchForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.jobsService.getJobs().subscribe({
      next: (response) => {
        this.allJobs.set(response.data);
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Impossible de charger les offres. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
        console.error('Error fetching jobs:', err);
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private applyFilters(): void {
    const { keyword, location } = this.searchForm.value;
    const lowerKeyword = (keyword || '').toLowerCase();
    const lowerLocation = (location || '').toLowerCase();

    const filtered = this.allJobs().filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(lowerKeyword);
      const matchesLocation = job.location.toLowerCase().includes(lowerLocation);
      return matchesTitle && matchesLocation;
    });

    filtered.sort((a, b) => b.created_at - a.created_at);

    this.filteredJobs.set(filtered);
    this.currentPage.set(1);
  }

  onApply(job: Job) {
    const user = this.currentUser();
    if (!user || !user.id) return;

    this.applicationsService.checkExists(user.id, job.slug).subscribe({
      next: (existing) => {
        if (existing.length > 0) {
          alert('Vous suivez déjà cette candidature !');
        } else {
          this.createApplication(job, user.id);
        }
      },
      error: (err) => console.error('Error checking existence:', err)
    });
  }

  private createApplication(job: Job, userId: string) {
    const newApp: ApplicationItem = {
      userId,
      offerId: job.slug,
      apiSource: 'arbeitnow',
      title: job.title,
      company: job.company_name,
      location: job.location,
      url: job.url,
      status: 'en_attente',
      dateAdded: new Date().toISOString()
    };

    this.applicationsService.addApplication(newApp).subscribe({
      next: () => alert('Candidature ajoutée au suivi !'),
      error: (err) => console.error('Error adding application:', err)
    });
  }
}
