
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
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public fetchUsers: UserRegistrationService,
  
  ) {

    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
  // this.getUser();
    this.getFavoriteMovies();
  }

  //  getUser(): void {
//   this.fetchApiData.getUser().subscribe((resp: any) => {
//     this.userData = {
//       ...resp,
//  npm install --save-dev typedoc     id: resp._id,
//       password: this.userData.password,
//       token: this.userData.token
//     };
//     localStorage.setItem("user", JSON.stringify(this.userData));
//     console.log(this.userData);
//   });
// }

/**
 * Function to edit user using FetchApiData
 */
editUser(): void {
  this.fetchApiData.editUser( this.user.Username, this.userData).subscribe((res: any) => {
    this.userData = {
      ...res,
      id: res._id,
      password: this.userData.password,
      token: this.userData.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    console.log(this.userData);
  });
}

showGenreAlert(genre: any): void {
  alert(genre);
}

showDirectorAlert(director: any): void {
  alert(director);
}

showSynopsisAlert(synopsis: any): void {
  alert(synopsis);
} 

/**
 * Function to update user profile using FetchApiData
 */
  /**updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (updatedUser: any) => {
        this.snackBar.open('User profile updated successfully', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.editUser(); // refresh user data
      },
      (error) => {
        this.snackBar.open('Failed to update user profile', 'OK', {
          duration: 2000
        });
        console.error('Error updating user:', error);
      }
    );
  }*/

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  /**
 * Function to get users favorite movies using FetchApiData
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.FavoriteMovies = resp.filter((m : any) => {
          return this.userData.FavoriteMovies.includes(m._id);
        });
        console.log('Favorite movies :', this.FavoriteMovies);
    });
}

/** 
 * Function to remove a movie from users favorites using FetchApiData
 */
  removeFromFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.deleteFavoriteMovies(user.Username, movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
      this.getFavoriteMovies();
    });
  }

  /**
   * Function to delete a user using FetchApiData
   * 
  */
  deleteUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    this.fetchApiData.deleteUser(username).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/welcome']);
      this.snackBar.open('User deleted successfully', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Function to log out the user
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Fuction to navigate to movies page
   */

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }
}