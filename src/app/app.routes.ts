import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterPageComponent } from './features/auth/register-page/register-page.component';
import { JobsPageComponent } from './features/jobs/pages/jobs-page/jobs-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'jobs', component: JobsPageComponent },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/pages/favorites-page/favorites-page.component')
      .then(m => m.FavoritesPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    loadComponent: () => import('./features/applications/applications/applications.component')
      .then(m => m.ApplicationsPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/auth/pages/profile-page/profile-page.component')
      .then(m => m.ProfilePageComponent),
    canActivate: [authGuard]
  }
];
