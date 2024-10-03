
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData:UserRegistrationService,
    public router:Router,
    public dialog:MatDialog
  ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      let user = JSON.parse(localStorage.getItem("user") || "");
            this.movies.forEach((movie: any) => {
                movie.isFavorite = user.favoriteMovies.includes(movie._id);
            })
      console.log(this.movies);
      return this.movies;
    }, err=>{
      console.log(err);
    })
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
}

openGenreDialog(movie:any): void {
  this.dialog.open(MessageBoxComponent, {
    data:{
      title: String(movie.genre.type).toUpperCase(),
      content: movie.genre.description
    },
     width: '350px'
  });
}

openDirectorDialog (movie:any): void {
  this.dialog.open(MessageBoxComponent, {
    data:{
      title: movie.director.name,
      content:movie.genre.description
    },
    width: '350px'
  });
}

openSynopsisDialog(movie:any): void {
  this.dialog.open(MessageBoxComponent, {
    data:{
      title: movie.title, 
      content: movie.description
    },
    width: '350px'
  });
}

addToFavorites(movieId:string): void {
  this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
    console.log(resp);
    this.ngOnInit();
  })

}
}