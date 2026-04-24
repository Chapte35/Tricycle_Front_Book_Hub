import { Myloans } from './pages/my-loans/my-loans';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { Home } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { BookDetail } from './pages/book-detail/book-detail';
import { LoginComponent } from './pages/login/login';
import { HomeAdminComponent } from './pages/home-admin/home-admin';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login',    component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfilePage },
    { path: 'books/:id', component: BookDetail },
    { path: 'myloans', component: Myloans },
    { path: 'admin', component: HomeAdminComponent, canActivate: [adminGuard] },
    
  ]
