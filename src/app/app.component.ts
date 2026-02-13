import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { AuthService } from './core/services/auth.service';
import { loadFavorites } from './features/favorites/store/favorites.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'job-finder';
  private store = inject(Store);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user && user.id) {
      this.store.dispatch(loadFavorites({ userId: user.id }));
    }
  }
}
