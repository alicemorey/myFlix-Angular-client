
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
  favoriteMovies: any[] = [];

  constructor(
    public userService: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.userData = response;
    });
  }

  getFavoriteMovies(): void {
    this.userService.getFavoriteMovies().subscribe((moviesIds: any[]) => {
      console.log('Favorite movies IDs:', moviesIds);
      this.favoriteMovies = [];
      moviesIds.forEach(id => {
        this.userService.getOneMovie(id).subscribe((movie: any) => {
          this.favoriteMovies.push(movie);
        });
      });

    });
  }
  

  updateUser(): void {
    this.userService.editUser(this.userData).subscribe(() => {
      console.log('User updated successfully');
    });
  }

  resetUser(): void {
    this.getUser();
  }

  backToMovie(): void {
    this.router.navigate(['/movies']);
  }

  removeFromFavorites(movieId: string): void {
    this.userService.deleteFavoriteMovie(movieId).subscribe(() => {
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