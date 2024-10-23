
import { FetchApiDataService } from '../fetch-api-data.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userData: any = {
    Username: '',
    Email: '',
    Birthday: ''
  };

  movies: any[] = [];
  user: any = {};
  favorites: any[] = [];
  FavoriteMovies: any[] = [];
  DeleteUserComponent: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public fetchUsers: FetchApiDataService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  
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
}*/

/**
 * Function to update user profile using FetchApiData
 */
updateUser(): void {
  console.log('Updating user with data:', this.userData);
  this.fetchApiData.updateUser(this.userData).subscribe({
    next: (res: any) => {
    console.log('Update successful:', res);
    const updatedUser = {
      ...res,
      token: JSON.parse(localStorage.getItem('user') || '{}').token
    };
      this.snackBar.open('User profile updated successfully', 'OK', {
        duration: 2000
    });

    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.getFavoriteMovies(); 
    // refresh user data
    this.userData = {
      Username:'',
      Email:'',
      Birthday:''
      };
    },
    error: (error) => {
      this.snackBar.open('Failed to update user profile', 'OK', {
        duration: 2000
      });
      console.error('Error updating user:', error);
    }
});
}

resetUser(): void {
  this.user = JSON.parse(localStorage.getItem("user") || "{}");
}


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
 //opens a dialog box to confirm deletion of user
  openDeleteUserDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '300px',
      data:{userId:this.userData}
    });
    
    dialogRef.componentInstance.confirmDelete.subscribe(() => {
      // Call deleteUser with the user ID from the dialog data
      this.deleteUser(dialogRef.componentInstance.data.user.id); // Assuming userData has an id property
    });

  }
  
  deleteUser(userId:string): void {
    console.log('Deleting user:', userId);
    this.fetchApiData.deleteUser(userId).subscribe({
    next: (res:any) => {
        console.log('User deleted successfully', res);
        const deletedUser = {
          ...res,
          token: JSON.parse(localStorage.getItem('user') || '{}').token
        };
        this.snackBar.open('User deleted successfully', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(deletedUser));
      this.userData = {
        Username:'',
        Email:'',
        Birthday:''
        };
    },
    error: (error) => {
      console.error('Error deleting user:', error);
      this.snackBar.open('Failed to delete user', 'OK', {
        duration: 2000
      });
    }
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