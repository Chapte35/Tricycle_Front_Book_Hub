import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { Home } from './pages/home/home';
import {AppLayout} from './components/layout/app-layout/app-layout';

export const routes: Routes = [
  { path: '', component: AppLayout,
  children: [
    { path: '', component: Home },
    { path: 'register', component: RegisterComponent },
  ],
  }
];
