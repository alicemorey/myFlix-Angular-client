
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData:UserRegistrationService,
    public router:Router,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
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

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.FavoriteMovies= resp;
    });
  }

  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
  }
  

  toggleFavorite(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username;
    const movieId = movie._id;
  
    if (username && movieId) {
      this.fetchApiData.addFavoriteMovies(movie._id).subscribe(
        (response) => {
          console.log('Movie added to favorites', response);
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000
          });
        },
        (error) => {
          console.error('Error adding movie to favorites', error);
          this.snackBar.open('Error adding movie to favorites', 'OK', {
            duration: 2000
          });
        }
      );
    } else {
      console.error('Username or movieId is undefined');
      this.snackBar.open('Error: Unable to add movie to favorites', 'OK', {
        duration: 2000
      });
    }
  }  
 

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");

}

  redirectProfile(): void {
  this.router.navigate(["profile"]);
}

openGenreDialog(genre: string): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      title: 'Genre',
      content: genre
    },
    width: '350px'
  });
}




openDirectorDialog(movie: any): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      title: movie.Director.Name,
      content: `Bio: ${movie.Director.Bio}\nBirth: ${movie.Director.Birth}`
    },
    width: '350px'
  });
}


openSynopsisDialog(movie:any): void {
  this.dialog.open(MessageBoxComponent, {
    data:{
    
      content: movie.Description
    },
    width: '350px'
  });
}
}
