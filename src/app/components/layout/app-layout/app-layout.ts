import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    Footer
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {}
