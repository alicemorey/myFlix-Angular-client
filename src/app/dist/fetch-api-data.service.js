"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FetchApiDataService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
//Declaring the api url that will provide data for the client app
var apiUrl = 'https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/';
var FetchApiDataService = /** @class */ (function () {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    function FetchApiDataService(http) {
        this.http = http;
    }
    // Making the api call for the user registration endpoint
    /**
     * Function to register a new user
     * @param userData
     * @returns this user signed up
     */
    //api call for user endpoint
    FetchApiDataService.prototype.userRegistrationService = function (userData) {
        console.log(userData);
        //make a POST request to the user registration endpoint
        return this.http
            .post(apiUrl + 'users', userData)
            .pipe(rxjs_1.catchError(this.handleError), operators_1.map(this.extractResponseData));
    };
    // User login endpoint
    /**
     * Function to login a user
     * @param userData
     * @returns thi user logged in
     */
    FetchApiDataService.prototype.userLoginService = function (userData) {
        return this.http
            .post(apiUrl + 'login', userData, {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(operators_1.map(this.extractResponseData), rxjs_1.catchError(this.handleError));
    };
    //Get all movies endpoint
    /**
     * Function to get all movies
     * @returns all movies
     */
    FetchApiDataService.prototype.getAllMovies = function () {
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({
            Authorization: 'Bearer ' + token
        });
        return this.http
            .get(apiUrl + 'movies', { headers: headers })
            .pipe(rxjs_1.catchError(this.handleError));
    };
    // Get a single movie endpoint
    /**
     * Function to get one movie
     * @param movie
     * @returns one movie
     */
    FetchApiDataService.prototype.getOneMovie = function (movie) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies' + movie._id, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(rxjs_1.catchError(this.handleError));
    };
    // get director endpoint
    /**
     * Function to get director
     * @param directorName
     * @returns
     */
    FetchApiDataService.prototype.getDirector = function (directorName) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/director/' + directorName, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(rxjs_1.catchError(this.handleError));
    };
    //get genre endpoint
    /**
     * Function to get genre
     * @param genreName
     * @returns
     */
    FetchApiDataService.prototype.getGenre = function (genreName) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genre/' + genreName, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(rxjs_1.catchError(this.handleError));
    };
    //get user endpoint
    /**
     * Function to get user
     * @returns this user
     */
    FetchApiDataService.prototype.getUser = function () {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users', {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(rxjs_1.catchError(this.handleError));
    };
    //get favorite movies endpoint
    /**
     * Function to get favorite movies
     * @returns user's favorite movies
     */
    FetchApiDataService.prototype.getFavoriteMovies = function () {
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'user/' + user.Username + '/movies', {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.map(function (response) { return response.FavoriteMovies; }), rxjs_1.catchError(function (error) {
            console.error('Error fetching favorite movies:', error);
            return rxjs_1.throwError(function () { return new Error('Failed to fetch favorite movies'); });
        }));
    };
    // Add favorite movie endpoint
    /**
     * Function to add favorite movies
     * @param username
     * @param movieId
     * @returns This movie added to user's favorite movies
     */
    FetchApiDataService.prototype.addFavoriteMovies = function (username, movieId) {
        var token = localStorage.getItem('token'); // Retrieve the token from localStorage
        return this.http.post(apiUrl + "users/" + username + "/movies/" + movieId, {}, // Since it's a POST request without a body, pass an empty object
        {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' // Optionally specify content type
            })
        }).pipe(rxjs_1.catchError(this.handleError) // Handle any potential errors
        );
    };
    //delete favorite movie endpoint
    /**
     * Function to delete favorite movies
     * @param username
     * @param movieId
     * @returns this movies removed from user's favorite movies
     */
    FetchApiDataService.prototype.deleteFavoriteMovies = function (username, movieId) {
        var token = localStorage.getItem('token');
        return this.http["delete"](apiUrl + "users/" + username + "/movies/" + movieId, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(rxjs_1.catchError(this.handleError));
    };
    //edit user endpoint
    /**
     * Function to edit user
     * @param userData
     * @param username
     * @returns this user edited
     */
    FetchApiDataService.prototype.updateUser = function (userData) {
        var token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('User details:', userData);
        console.log('Stored user:', user);
        return this.http
            .put(apiUrl + "users/" + user.Username, userData, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.map(this.extractResponseData), rxjs_1.catchError(this.handleError));
    };
    //delete user
    /** Function to delete user
     * @param username
     * @returns this user deleted
     */
    FetchApiDataService.prototype.deleteUser = function (userId) {
        var _this = this;
        var token = localStorage.getItem('token');
        if (!token) {
            return rxjs_1.throwError(function () { return new Error('No authentication token found'); });
        }
        console.log("Deleting user: " + userId);
        console.log("Token: " + token);
        return this.http["delete"](apiUrl + "users/" + userId, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        })
            .pipe(operators_1.map(this.extractResponseData), rxjs_1.catchError(function (error) {
            if (error.status === 401) {
                console.error('Unauthorized: Token may be invalid or expired');
                // Optionally, clear token and redirect to login
                // localStorage.removeItem('token');
                // this.router.navigate(['/login']);
            }
            return _this.handleError(error);
        }));
    };
    // Non-typed response extraction
    FetchApiDataService.prototype.extractResponseData = function (res) {
        var body = res;
        return body || {};
    };
    FetchApiDataService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error Occurred:', error.error.message);
        }
        else {
            console.error("Error Status code " + error.status + ", " + ("Error body is: " + error.error));
        }
        return rxjs_1.throwError('Something bad happenened; please try again later.');
    };
    FetchApiDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FetchApiDataService);
    return FetchApiDataService;
}());
exports.FetchApiDataService = FetchApiDataService;
