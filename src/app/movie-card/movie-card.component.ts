
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';

import { MessageBoxComponent } from '../message-box/message-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public FetchApiDataService: FetchApiDataService,
    public router:Router,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
}

/**
 * Function to get all movies
 * @returns array holding all movies
 */
getMovies(): void {
  this.FetchApiDataService.getAllMovies().subscribe((resp: any) => {
    console.log('Movies received:', resp);  
    this.movies = resp;

      let user = JSON.parse(localStorage.getItem("user") || "");
            this.movies.forEach((movie: any) => {
                movie.isFavorite = user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false;
            });      console.log(this.movies);
      return this.movies;
    }, err=>{
      console.log(err);
    })
  }

/**
 * Function to add a movie to favorites
 * @param movieId 
 */
  addtoFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem ('user') || '{}');
    
    console.log('user', user);
    console.log('Movie ID:', movieId);
    
    this.FetchApiDataService
      .addFavoriteMovies(user.Username, movieId)
      .subscribe((res: any) => {
        console.log('Movie added to favorites', res);
        //update local storage
        user.FavoriteMovies = user.FavoriteMovies || [];
        user.FavoriteMovies.push(movieId);
        localStorage.setItem('user', JSON.stringify(user));
        this.getMovies();
      });
    this.snackBar.open('Movie added to favorites', 'OK', {
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
  * Function to logout the user
  */

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");

}

/**
 * Function to redirect to profile page
 */
  redirectProfile(): void {
  this.router.navigate(["profile"]);
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
      content: `Bio: ${movie.Director.Bio}\Birth: ${movie.Director.Birth}`
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
}
