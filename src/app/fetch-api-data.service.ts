import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,  catchError } from 'rxjs';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

    
 // Making the api call for the user registration endpoint
 /**
  * Function to register a new user
  * @param userData
  * @returns this user signed up
  */
 //api call for user endpoint
 public userRegistrationService(userData: any): Observable<any> {
  console.log(userData);
  //make a POST request to the user registration endpoint
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError), map(this.extractResponseData));

}

  // User login endpoint
  /**
   * Function to login a user
   * @param userData
   * @returns thi user logged in
   */
  public userLoginService(userData: any): Observable<any> {
    return this.http
    .post(apiUrl + 'login', userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

  
  //Get all movies endpoint
/**
 * Function to get all movies
 * @returns all movies
 */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .get(apiUrl + 'movies', { headers })
        .pipe(catchError(this.handleError));
    }

  // Get a single movie endpoint
  /**
   * Function to get one movie
   * @param movie 
   * @returns one movie
   */
  public getOneMovie(movie: { _id: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get( apiUrl + 'movies'+ movie._id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }  

  // get director endpoint
  /**
   * Function to get director
   * @param directorName 
   * @returns 
   */
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
  /**
   * Function to get genre
   * @param genreName 
   * @returns 
   */
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
  /**
   * Function to get user
   * @returns this user
   */
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
  /**
   * Function to get favorite movies
   * @returns user's favorite movies
   */
  public getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'user/' + user.Username + '/movies', {
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
/**
 * Function to add favorite movies
 * @param username 
 * @param movieId 
 * @returns This movie added to user's favorite movies
 */
public addFavoriteMovies(username: string, movieId: string): Observable<any> {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`,
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
  /**
   * Function to delete favorite movies
   * @param username 
   * @param movieId 
   * @returns this movies removed from user's favorite movies
   */
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
  /**
   * Function to edit user
   * @param userData 
   * @param username
   * @returns this user edited
   */
  public updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User details:', userData);
    console.log('Stored user:', user);
   
    return this.http
    .put(`${apiUrl}users/${user.Username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

  //delete user
  /** Function to delete user
   * @param username
   * @returns this user deleted
   */
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }
  
    console.log(`Deleting user: ${username}`);
    console.log(`Token: ${token}`);
  
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Unauthorized: Token may be invalid or expired');
            // Optionally, clear token and redirect to login
            // localStorage.removeItem('token');
            // this.router.navigate(['/login']);
          }
          return this.handleError(error);
        })
      );
  }
  
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
}

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error Occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
    );
  }
  return throwError('Something bad happenened; please try again later.');
}
}


