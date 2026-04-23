import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from "../../components/profile/profile";
import { ProfileService } from '../../services/profile-service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './profile.html', 
  styleUrl: './profile.css',
})
export class ProfilePage implements OnInit {

  private profileService = inject(ProfileService); 
  user: User | null = null;
  private userId: number = JSON.parse(localStorage.getItem('user') || '{}').id;

  ngOnInit() {
    this.profileService.getUser(this.userId).subscribe(user => {
      this.user = user;
    });
  }

  onSave(updatedUser: Partial<User>) {
    this.profileService.updateProfile(this.userId, updatedUser).subscribe(user => {
      this.user = user;
      console.log('Profil mis à jour', user);
    });
  }
}