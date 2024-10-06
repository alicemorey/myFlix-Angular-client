
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
  favoriteMovies: any[] = [];

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
                movie.isFavorite = user.favoriteMovies ? user.favoriteMovies.includes(movie._id): false;
            });
      console.log(this.movies);
      return this.movies;
    }, err=>{
      console.log(err);
    })
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies= resp;
    });
  }

  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
  }
  

  toggleFavorite(movie:any): void {
    if (this.isFavorite(movie)) {
      this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe(() => {
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000
        });
        this.getFavoriteMovies();
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe(() => {
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000
        });
        this.getFavoriteMovies();
      })
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
