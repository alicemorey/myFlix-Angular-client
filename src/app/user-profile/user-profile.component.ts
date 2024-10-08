
import { UserRegistrationService } from '../fetch-api-data.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userData: any = {
    username: '',
    password: '',
    email: '',
    birthday: ''
  };
  FavoriteMovies: any[] = [];

  constructor(
    public userService: UserRegistrationService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {

    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    })
  }

  getFavoriteMovies(): void {
    this.userService.getFavoriteMovies().subscribe({
      next:(movies: any) => {
        console.log('Favorite Movies API Response:', movies);
        this.FavoriteMovies = movies;
        console.log('Favorite movies :', this.FavoriteMovies);
      },
    error: (error) => {
      console.error('Error fetching favorite movies:', error);
    }
    });
}

  updateUser(): void {
    this.userService.editUser(this.userData).subscribe(
      (updatedUser: any) => {
        this.snackBar.open('User profile updated successfully', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.getUser(); // refresh user data
      },
      (error) => {
        this.snackBar.open('Failed to update user profile', 'OK', {
          duration: 2000
        });
        console.error('Error updating user:', error);
      }
    );
  }

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  removeFromFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.deleteFavoriteMovies(user.Username, movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
      this.getFavoriteMovies();
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}