import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  profileForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.currentUser.set(user);
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onUpdate(): void {
    if (this.profileForm.invalid) return;

    this.isLoading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const userId = this.currentUser()?.id;
    if (!userId) return;

    const updates = this.profileForm.value;

    this.authService.updateProfile(userId, updates as Partial<User>).subscribe({
      next: (updatedUser) => {
        this.currentUser.set(updatedUser);
        this.successMessage.set('Profil mis à jour avec succès');
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Erreur lors de la mise à jour');
        this.isLoading.set(false);
      }
    });
  }

  onDeleteAccount(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      const userId = this.currentUser()?.id;
      if (!userId) return;

      this.authService.deleteAccount(userId).subscribe({
        next: () => {
          this.router.navigate(['/register']);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Erreur lors de la suppression');
        }
      });
    }
  }
}
