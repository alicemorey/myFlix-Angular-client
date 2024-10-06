"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserProfileComponent = void 0;
var core_1 = require("@angular/core");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(userService, router, snackBar) {
        this.userService = userService;
        this.router = router;
        this.snackBar = snackBar;
        this.userData = {
            username: '',
            password: '',
            email: '',
            birthday: ''
        };
        this.favoriteMovies = [];
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getFavoriteMovies();
    };
    UserProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (response) {
            _this.userData = response;
        });
    };
    UserProfileComponent.prototype.getFavoriteMovies = function () {
        var _this = this;
        this.userService.getFavoriteMovies().subscribe(function (moviesIds) {
            console.log('Favorite movies IDs:', moviesIds);
            _this.favoriteMovies = [];
            moviesIds.forEach(function (id) {
                _this.userService.getOneMovie(id).subscribe(function (movie) {
                    _this.favoriteMovies.push(movie);
                });
            });
        });
    };
    UserProfileComponent.prototype.updateUser = function () {
        this.userService.editUser(this.userData).subscribe(function () {
            console.log('User updated successfully');
        });
    };
    UserProfileComponent.prototype.resetUser = function () {
        this.getUser();
    };
    UserProfileComponent.prototype.backToMovie = function () {
        this.router.navigate(['/movies']);
    };
    UserProfileComponent.prototype.removeFromFavorites = function (movieId) {
        var _this = this;
        this.userService.deleteFavoriteMovie(movieId).subscribe(function () {
            _this.snackBar.open('Movie removed from favorites', 'OK', {
                duration: 2000
            });
            _this.getFavoriteMovies();
        });
    };
    UserProfileComponent.prototype.logOut = function () {
        localStorage.clear();
        this.router.navigate(['/welcome']);
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.scss']
        })
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
