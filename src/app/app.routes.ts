import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { JobsComponent } from './features/jobs/jobs/jobs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jobs', component: JobsComponent },
  { 
    path: 'favorites', 
    loadComponent: () => import('./features/favorites/favorites/favorites.component')
      .then(m => m.FavoritesComponent) 
  },
  { 
    path: 'applications', 
    loadComponent: () => import('./features/applications/applications/applications.component')
      .then(m => m.ApplicationsComponent) 
  }
];
