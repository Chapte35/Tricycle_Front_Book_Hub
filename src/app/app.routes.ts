import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { Home } from './pages/home/home';
import {AuthComponent} from './pages/auth/auth';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: AuthComponent },
    { path: 'register', component: RegisterComponent },
  ]
