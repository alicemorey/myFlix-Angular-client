
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
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
    public fetchApiData:UserRegistrationService,
    public router:Router,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
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


  addtoFavorites(movie: any): void {
    if (!movie || !movie._id) {
      console.error('Invalid movie object:', movie);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') as any);
      this.fetchApiData
      .addFavoriteMovies(user.Username)
      .subscribe((res:any) => {
          console.log('Movie added to favorites', res);
          //update local storage
          user.FavoriteMovies = user.FavoriteMovies || [];
          user.FavoriteMovies.push(movie._id);
          localStorage.setItem('user', JSON.stringify(user));
          this.getMovies();
      });          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000
          });
        }
  
      removeFromFavorites(movieId: string): void {
          const user: any = JSON.parse(localStorage.getItem('user') as any);
          this.fetchApiData
            .deleteFavoriteMovies(user.Username, { _id: movieId })
            .subscribe((res: any) => {
              console.log(res);
              //update local storage
              user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movieId);
              localStorage.setItem('user', JSON.stringify(user));
              this.getMovies();
            });
            this.snackBar.open("movie removed from favorites", 'OK', {
              duration: 2000
           });
        }
        isFavorite(movieId: string): boolean {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const userFavorites = user.FavoriteMovies || [];
          return userFavorites.includes(movieId);
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
