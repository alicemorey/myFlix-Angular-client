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
    UserRegistrationService.prototype.userRegistration = function (userDetails) {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails)
            .pipe(operators_1.catchError(this.handleError));
    };
    // User login endpoint
    UserRegistrationService.prototype.userLogin = function (userDetails) {
        return this.http.post(apiUrl + 'login', userDetails).pipe(operators_1.catchError(this.handleError));
    };
    //Get all movies endpoint
    UserRegistrationService.prototype.getAllMovies = function () {
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({
            Authorization: 'Bearer ' + token
        });
        return this.http.get(apiUrl + 'movies', { headers: headers })
            .pipe(operators_1.catchError(this.handleError));
    };
    // Get a single movie endpoint
    UserRegistrationService.prototype.getOneMovie = function (movie) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + "movies/" + movie._id, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    // get director endpoint
    UserRegistrationService.prototype.getDirector = function (directorName) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/director/' + directorName, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //get genre endpoint
    UserRegistrationService.prototype.getGenre = function (genreName) {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genre/' + genreName, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //get user endpoint
    UserRegistrationService.prototype.getUser = function () {
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users', {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //get favorite movies endpoint
    UserRegistrationService.prototype.getFavoriteMovies = function () {
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        var token = localStorage.getItem('token');
        return this.http.get(apiUrl + "users/" + user.Username + "/movies", {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.map(function (response) { return response.FavoriteMovies; }), operators_1.catchError(function (error) {
            console.error('Error fetching favorite movies:', error);
            return rxjs_1.throwError(function () { return new Error('Failed to fetch favorite movies'); });
        }));
    };
    //add favorite movie endpoint
    UserRegistrationService.prototype.addFavoriteMovies = function (movie) {
        var user = JSON.parse(localStorage.getItem('user') || '{}'); // Fetch the correct user info
        var token = localStorage.getItem('token');
        return this.http.post(apiUrl + "users/" + user.Username + "/movies/" + movie._id, {}, // Empty body, as we're adding to favorites
        {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //delete favorite movie endpoint
    UserRegistrationService.prototype.deleteFavoriteMovies = function (username, movie) {
        var token = localStorage.getItem('token');
        return this.http["delete"](apiUrl + "users/" + username + "/movies/" + movie._id, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //edit user endpoint
    UserRegistrationService.prototype.editUser = function (userDetails) {
        var token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.put(apiUrl + "users/" + user.Username, userDetails, {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    //delete user
    UserRegistrationService.prototype.deleteUser = function () {
        var token = localStorage.getItem('token');
        return this.http["delete"](apiUrl + 'users', {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + token
            })
        }).pipe(operators_1.catchError(this.handleError));
    };
    UserRegistrationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserRegistrationService);
    return UserRegistrationService;
}());
exports.UserRegistrationService = UserRegistrationService;
