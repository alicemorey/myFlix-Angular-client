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
    function MovieCardComponent(fetchApiData, router, dialog) {
        this.fetchApiData = fetchApiData;
        this.router = router;
        this.dialog = dialog;
        this.movies = [];
        this.favoriteMovies = [];
    }
    MovieCardComponent.prototype.ngOnInit = function () {
        this.getMovies();
        this.getFavoriteMovies();
    };
    MovieCardComponent.prototype.getMovies = function () {
        var _this = this;
        this.fetchApiData.getAllMovies().subscribe(function (resp) {
            _this.movies = resp;
            var user = JSON.parse(localStorage.getItem("user") || "");
            _this.movies.forEach(function (movie) {
                movie.isFavorite = user.favoriteMovies.includes(movie._id);
            });
            console.log(_this.movies);
            return _this.movies;
        }, function (err) {
            console.log(err);
        });
    };
    MovieCardComponent.prototype.getFavoriteMovies = function () {
        var _this = this;
        this.fetchApiData.getUser().subscribe(function (resp) {
            _this.favoriteMovies = resp.favoriteMovies;
            console.log(_this.favoriteMovies);
            return _this.favoriteMovies;
        });
    };
    MovieCardComponent.prototype.isFavorite = function (movie) {
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
    };
    MovieCardComponent.prototype.toggleFavorite = function (movie) {
        var _this = this;
        if (this.isFavorite(movie)) {
            this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe(function (resp) {
                _this.getFavoriteMovies();
            });
        }
        else {
            this.fetchApiData.addFavoriteMovie(movie._id).subscribe(function (resp) {
                _this.getFavoriteMovies();
            });
        }
    };
    MovieCardComponent.prototype.logout = function () {
        this.router.navigate(["welcome"]);
        localStorage.removeItem("user");
    };
    MovieCardComponent.prototype.redirectProfile = function () {
        this.router.navigate(["profile"]);
    };
    MovieCardComponent.prototype.openGenreDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: String(movie.genre.type).toUpperCase(),
                content: movie.genre.description
            },
            width: '350px'
        });
    };
    MovieCardComponent.prototype.openDirectorDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: movie.director.name,
                content: movie.genre.description
            },
            width: '350px'
        });
    };
    MovieCardComponent.prototype.openSynopsisDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: movie.title,
                content: movie.description
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
