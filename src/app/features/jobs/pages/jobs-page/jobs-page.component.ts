import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  onSearch(): void {
    if (this.searchForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.allJobs.set([]);
    this.filteredJobs.set([]);

    this.jobsService.getJobs().subscribe({
      next: (response) => {
        this.allJobs.set(response.data);
        this.filteredJobs.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erreur lors du chargement des offres. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
        console.error('Error fetching jobs:', err);
      }
    });
  }
}
