import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive  } from '@angular/router';
import { AuthService } from '../../../services/auth-service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterLinkActive],

  templateUrl: './header.html',
  styleUrl: './header.css',
})


export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  menuOpen = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  get username(): string | null {
    const user = this.authService.getUser();
    return user ? `${user.firstName}` : null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
