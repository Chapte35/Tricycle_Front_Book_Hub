import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from "../../components/profile/profile";
import { ChangePasswordRequest, ProfileService } from '../../services/profile-service';
import { UserService } from '../../services/user-service';
import { User } from '../../interfaces/user';
import { ChangePasswordComponent } from '../../components/forms/change-password/change-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileComponent, ChangePasswordComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfilePage implements OnInit {

  private profileService = inject(ProfileService);
  private userService = inject(UserService);
  private router = inject(Router);

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

  onChangePassword(data: ChangePasswordRequest) {
    this.userService.update(this.userId, { password: data.newPassword }).subscribe(() => {
      console.log('Mot de passe mis à jour');
    });
  }

  onDeleteAccount() {
    if (confirm('Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.')) {
      this.profileService.deleteAccount(this.userId).subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });
    }
  }
}