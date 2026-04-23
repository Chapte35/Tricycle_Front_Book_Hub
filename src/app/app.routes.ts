import { Myloans } from './pages/my-loans/my-loans';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { Home } from './pages/home/home';
import {AuthComponent} from './pages/auth/auth';
import { BookDetail } from './pages/book-detail/book-detail';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: AuthComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'books/:id', component: BookDetail },
    { path: 'myloans', component: Myloans },
  ]
