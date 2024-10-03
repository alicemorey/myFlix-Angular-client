
import { UserRegistrationService } from '../fetch-api-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    public router: Router
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
    this.userService.getFavoriteMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies;
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

  removeFromFavorite(movie: any): void {
    this.userService.deleteFavoriteMovie(movie._id).subscribe(() => {
      this.getFavoriteMovies();
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}