"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRegistrationService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
//Declaring the api url that will provide data for the client app
var apiUrl = 'https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/';
var UserRegistrationService = /** @class */ (function () {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    function UserRegistrationService(http) {
        this.http = http;
    }
    UserRegistrationService.prototype.getToken = function () {
        var user = localStorage.getItem('user');
        return user ? JSON.parse(user).token : '';
    };
    // handle API errors
    UserRegistrationService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        }
        else {
            console.error("Error Status code " + error.status + ", " +
                ("Error body is: " + error.error));
        }
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    // Making the api call for the user registration endpoint
    /**
     * Function to register a new user
     * @param userDetails
     * @returns this user signed up
     */
    UserRegistrationService.prototype.userRegistration = function (userDetails) {
        console.log(userDetails);
        //make a POST request to the user registration endpoint
        return this.http
            .post(apiUrl + '/users', userDetails)
            .pipe(operators_1.catchError(this.handleError));
    };
    // User login endpoint
    /**
     * Function to login a user
     * @param userDetails
     * @returns thi user logged in
     */
    UserRegistrationService.prototype.userLogin = function (userDetails) {
        return this.http
            .post(apiUrl + 'login', userDetails).pipe(operators_1.catchError(this.handleError));
    };
    //Get all movies endpoint
    /**
     * Function to get all movies
     * @returns all movies
     */
    UserRegistrationService.prototype.getAllMovies = function () {
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({
            Authorization: 'Bearer ' + token
        });
        return this.http
            .get(apiUrl + 'movies', { headers: headers })
            .pipe(operators_1.catchError(this.handleError));
    };
    // Get a single movie endpoint
    /**
     * Function to get one movie
     * @param movie
     * @returns one movie
     */
    UserRegistrationService.prototype.getOneMovie = function (movie) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies' + movie._id, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    // get director endpoint
    /**
     * Function to get director
     * @param directorName
     * @returns
     */
    UserRegistrationService.prototype.getDirector = function (directorName) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/director/' + directorName, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //get genre endpoint
    /**
     * Function to get genre
     * @param genreName
     * @returns
     */
    UserRegistrationService.prototype.getGenre = function (genreName) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genre/' + genreName, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //get user endpoint
    /**
     * Function to get user
     * @returns this user
     */
    UserRegistrationService.prototype.getUser = function () {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users', {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //get favorite movies endpoint
    /**
     * Function to get favorite movies
     * @returns user's favorite movies
     */
    UserRegistrationService.prototype.getFavoriteMovies = function () {
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'user/' + user.Username + '/movies', {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.map(function (response) { return response.FavoriteMovies; }), operators_1.catchError(function (error) {
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
    UserRegistrationService.prototype.addFavoriteMovies = function (username, movieId) {
        var token = localStorage.getItem('token'); // Retrieve the token from localStorage
        return this.http.post(apiUrl + "users/" + username + "/movies/" + movieId, {}, // Since it's a POST request without a body, pass an empty object
        {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' // Optionally specify content type
            })
        }).pipe(operators_1.catchError(this.handleError) // Handle any potential errors
        );
    };
    //delete favorite movie endpoint
    /**
     * Function to delete favorite movies
     * @param username
     * @param movieId
     * @returns this movies removed from user's favorite movies
     */
    UserRegistrationService.prototype.deleteFavoriteMovies = function (username, movieId) {
        var token = localStorage.getItem('token');
        return this.http["delete"](apiUrl + "users/" + username + "/movies/" + movieId, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //edit user endpoint
    /**
     * Function to edit user
     * @param userDetails
     * @param username
     * @returns this user edited
     */
    UserRegistrationService.prototype.editUser = function (userDetails) {
        var token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('User details:', userDetails);
        console.log('Stored user:', user);
        return this.http.put(apiUrl + "user/" + user.Username, userDetails, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //delete user
    /** Function to delete user
     * @param username
     * @returns this user deleted
     */
    UserRegistrationService.prototype.deleteUser = function (userID) {
        var body = JSON.stringify({ "id": userID });
        var token = localStorage.getItem('token');
        return this.http["delete"](apiUrl + 'users' + userID, { headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            }), body: body
        }).pipe(operators_1.map(this.extractResponseData), operators_1.catchError(this.handleError));
    };
    // Non-typed response extraction
    UserRegistrationService.prototype.extractResponseData = function (res) {
        var body = res;
        return body || {};
    };
    UserRegistrationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserRegistrationService);
    return UserRegistrationService;
}());
exports.UserRegistrationService = UserRegistrationService;
