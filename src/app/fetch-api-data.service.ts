import { Injectable } from '@angular/core';
import {map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {

  }

  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
}

 // handle API errors
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
    } else {
        console.error(
            `Error Status code ${error.status}, ` +
            `Error body is: ${error.error}`
        );
    }
    return throwError('Something bad happened; please try again later.');
}

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

  // User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  
  //Get all movies endpoint

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(apiUrl + 'movies', { headers })
        .pipe(catchError(this.handleError));
    }

  // Get a single movie endpoint
  public getOneMovie(movie: { _id: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${movie._id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }  

  // get director endpoint
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  //get genre endpoint
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  //get user endpoint
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  //get favorite movies endpoint
  public getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    return this.http.get(`${apiUrl}users/${user.Username}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })

    }).pipe(
      map((response: any) => response.FavoriteMovies),
      catchError((error) => {
        console.error('Error fetching favorite movies:', error);
        return throwError(() => new Error('Failed to fetch favorite movies'));
      })
    );
  }
  
// Add favorite movie endpoint
public addFavoriteMovies(username: string, movieId: string): Observable<any> {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  return this.http.post(
    `${apiUrl}/users/${username}/movies/${movieId}`,
    {},  // Since it's a POST request without a body, pass an empty object
    {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  // Set the Authorization header
        'Content-Type': 'application/json' // Optionally specify content type
      })
    }
  ).pipe(
    catchError(this.handleError)  // Handle any potential errors
  );
}


  //delete favorite movie endpoint
  public deleteFavoriteMovies(username: string, movieId:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
  //edit user endpoint
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(`${apiUrl}users/${user.Username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  //delete user
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }
}
