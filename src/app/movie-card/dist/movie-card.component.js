"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovieCardComponent = void 0;
var core_1 = require("@angular/core");
var message_box_component_1 = require("../message-box/message-box.component");
var MovieCardComponent = /** @class */ (function () {
    function MovieCardComponent(fetchApiData, router, dialog, snackBar) {
        this.fetchApiData = fetchApiData;
        this.router = router;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.movies = [];
    }
    MovieCardComponent.prototype.ngOnInit = function () {
        this.getMovies();
    };
    MovieCardComponent.prototype.getMovies = function () {
        var _this = this;
        this.fetchApiData.getAllMovies().subscribe(function (resp) {
            console.log('Movies received:', resp);
            _this.movies = resp;
            var user = JSON.parse(localStorage.getItem("user") || "");
            _this.movies.forEach(function (movie) {
                movie.isFavorite = user.FavoriteMovies ? user.FavoriteMovies.includes(movie._id) : false;
            });
            console.log(_this.movies);
            return _this.movies;
        }, function (err) {
            console.log(err);
        });
    };
    MovieCardComponent.prototype.addtoFavorites = function (movieId) {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('user'));
        this.fetchApiData
            .addFavoriteMovies(user.Username, movieId)
            .subscribe(function (res) {
            console.log('Movie added to favorites', res);
            //update local storage
            user.FavoriteMovies = user.FavoriteMovies || [];
            user.FavoriteMovies.push(movieId);
            localStorage.setItem('user', JSON.stringify(user));
            _this.getMovies();
        });
        this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000
        });
    };
    MovieCardComponent.prototype.removeFromFavorites = function (movieId) {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('user'));
        this.fetchApiData
            .deleteFavoriteMovies(user.Username, movieId)
            .subscribe(function (res) {
            console.log(res);
            //update local storage
            user.FavoriteMovies = user.FavoriteMovies.filter(function (id) { return id !== movieId; });
            localStorage.setItem('user', JSON.stringify(user));
            _this.getMovies();
        });
        this.snackBar.open("movie removed from favorites", 'OK', {
            duration: 2000
        });
    };
    MovieCardComponent.prototype.isFavorite = function (movieId) {
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        var userFavorites = user.FavoriteMovies || [];
        return userFavorites.includes(movieId);
    };
    MovieCardComponent.prototype.logout = function () {
        this.router.navigate(["welcome"]);
        localStorage.removeItem("user");
    };
    MovieCardComponent.prototype.redirectProfile = function () {
        this.router.navigate(["profile"]);
    };
    MovieCardComponent.prototype.openGenreDialog = function (genre) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: 'Genre',
                content: genre
            },
            width: '350px'
        });
    };
    MovieCardComponent.prototype.openDirectorDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: movie.Director.Name,
                content: "Bio: " + movie.Director.Bio + "\nBirth: " + movie.Director.Birth
            },
            width: '350px'
        });
    };
    MovieCardComponent.prototype.openSynopsisDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                content: movie.Description
            },
            width: '350px'
        });
    };
    MovieCardComponent = __decorate([
        core_1.Component({
            selector: 'app-movie-card',
            templateUrl: './movie-card.component.html',
            styleUrls: ['./movie-card.component.scss']
        })
    ], MovieCardComponent);
    return MovieCardComponent;
}());
exports.MovieCardComponent = MovieCardComponent;
