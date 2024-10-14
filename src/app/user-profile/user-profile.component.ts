
import { UserRegistrationService } from '../fetch-api-data.service';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

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
  movies: any[] = [];
  user: any = {};
  favorites: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public fetchUsers: UserRegistrationService,
    private dialog: MatDialog,
  
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

/**
showGenreAlert(genre: any): void {
  alert(genre);
}

showDirectorAlert(director: any): void {
  alert(director);
}

showSynopsisAlert(synopsis: any): void {
  alert(synopsis);
} */

/**
 * Function to open a dialog box with movie details on genre
 * @param genre 
 */
openGenreDialog(genre: string): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      title: 'Genre',
      content: genre
    },
    width: '350px'
  });
}



/**
 * Function to open a dialog box with movie details on director
 * @param movie 
 */
openDirectorDialog(movie: any): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      title: movie.Director.Name,
      content: `Bio: ${movie.Director.Bio}\nBirth: ${movie.Director.Birth}`
    },
    width: '350px'
  });
}

/**
 * Function to open a dialog box with movie details on synopsis
 * @param movie 
 */
openSynopsisDialog(movie:any): void {
  this.dialog.open(MessageBoxComponent, {
    data:{
    
      content: movie.Description
    },
    width: '350px'
  });
}


 
/**
 * Function to update user profile using FetchApiData
 */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(
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
  }

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  /**
 * Function to get users favorite movies using FetchApiData
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.favorites =this.FavoriteMovies = resp.filter((m : any) => {
          return this.userData.FavoriteMovies.includes(m._id);
        });
        console.log('Favorite movies :', this.favorites);
    });
}

      /**
         * Function to remove a movie from favorites
         * @param movieId 
         */
  removeFromFavorites(movieId: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
    .deleteFavoriteMovies(user.Username,movieId)
    .subscribe((res: any) => {
      console.log(res);
      //update local storage
      user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movieId);
      localStorage.setItem('user', JSON.stringify(user));
      this.getFavoriteMovies();
    });
    this.snackBar.open("movie removed from favorites", 'OK', {
      duration: 2000
   });
}

        /**
         * 
         * @param movieId 
         * @returns favorite status of a movie
         */
    isFavorite(movieId: string): boolean {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userFavorites = user.FavoriteMovies || [];
        return userFavorites.includes(movieId);
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