import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { JobCardComponent } from '../../components/job-card/job-card.component';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JobCardComponent],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.css'
})
export class JobsPageComponent {
  private fb = inject(FormBuilder);
  private jobsService = inject(JobsService);

  searchForm = this.fb.group({
    keyword: ['', Validators.required],
    location: ['', Validators.required]
  });

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  allJobs = signal<Job[]>([]);
  filteredJobs = signal<Job[]>([]);

  currentPage = signal<number>(1);
  pageSize = 10;

  displayedJobs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredJobs().slice(start, end);
  });

  totalPages = computed(() => Math.ceil(this.filteredJobs().length / this.pageSize));

  onSearch(): void {
    if (this.searchForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.allJobs.set([]);
    this.filteredJobs.set([]);
    this.currentPage.set(1);

    this.jobsService.getJobs().subscribe({
      next: (response) => {
        this.allJobs.set(response.data);
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erreur lors du chargement des offres. Veuillez réessayer plus tard.');
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
}
