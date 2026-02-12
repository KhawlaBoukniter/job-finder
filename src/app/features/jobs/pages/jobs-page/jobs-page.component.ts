import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.css'
})
export class JobsPageComponent {
  private fb = inject(FormBuilder);

  searchForm = this.fb.group({
    keyword: ['', Validators.required],
    location: ['', Validators.required]
  });

  onSearch(): void {
    if (this.searchForm.invalid) return;

    // Placeholder for search logic
    console.log('Search values:', this.searchForm.value);
  }
}
