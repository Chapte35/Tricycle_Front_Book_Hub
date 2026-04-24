import { AuthService } from './../../services/auth-service';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from "../../components/profile/profile";
import { ChangePasswordRequest, UserService } from '../../services/user-service';
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

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: User | null = null;

  private get userId(): number {
    return this.authService.getUser()!.id;
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(user => {
      this.currentUser = user; 
    });
  }

  onSave(updatedUser: Partial<User>) {
    this.userService.updateProfile(this.userId, updatedUser).subscribe(user => {
      this.currentUser = user;  
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
      this.userService.delete(this.userId).subscribe(() => {
        this.authService.logout(); 
        this.router.navigate(['/login']);
      });
    }
  }
}