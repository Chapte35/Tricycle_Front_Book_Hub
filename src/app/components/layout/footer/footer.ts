import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MarkdownModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  markdown = '';
  isPrivacyOpen = false;

  constructor(private http: HttpClient) {}

  openPrivacyPolicy(): void {
    if (!this.markdown) {
      this.http
        .get('assets/legal/privacy-policy.md', {
          responseType: 'text',
        })
        .subscribe((data) => {
          this.markdown = data;
          this.isPrivacyOpen = true;
        });
    } else {
      this.isPrivacyOpen = true;
    }
  }

  closePrivacyPolicy(): void {
    this.isPrivacyOpen = false;
  }
}