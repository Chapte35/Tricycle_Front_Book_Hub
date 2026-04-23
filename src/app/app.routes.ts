import { Myloans } from './pages/my-loans/my-loans';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { Home } from './pages/home/home';
import {AuthComponent} from './pages/auth/auth';
import { ProfileComponent } from './components/profile/profile';
import { BookDetail } from './pages/book-detail/book-detail';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login',    component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'books/:id', component: BookDetail },
    { path: 'myloans', component: Myloans },
  ]
