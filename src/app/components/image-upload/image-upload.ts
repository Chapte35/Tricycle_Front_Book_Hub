import { Component, Output, Input, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../constants/api.constants';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.html',
})
export class ImageUploadComponent {

  @Output() imageUploaded = new EventEmitter<string>();
  @Input() currentImage: string | null = null;

  private http = inject(HttpClient);

  preview: string | null = null;
  isUploading = false;
  errorMessage: string | null = null;

  ngOnInit() {
    if (this.currentImage) {
      this.preview = this.currentImage;
    }
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // Prévisualisation locale immédiate
    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result as string;
    reader.readAsDataURL(file);

    // Upload immédiat
    this.isUploading = true;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{ url: string }>(API_ROUTES.upload.image, formData).subscribe({
      next: (res) => {
        this.isUploading = false;
        this.imageUploaded.emit(`http://localhost:8080${res.url}`);
      },
      error: (err) => {
        this.isUploading = false;
        this.errorMessage = err?.error?.message ?? 'Erreur lors de l\'upload.';
      }
    });
  }
}