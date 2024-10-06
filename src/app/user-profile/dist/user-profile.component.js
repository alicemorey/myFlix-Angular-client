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
        this.userService.getFavoriteMovies().subscribe(function (movies) {
            console.log('Favorite movies :', movies);
            _this.favoriteMovies = movies.filter(function (movie) { return movie && movie.ImagePath; });
        }, function (error) {
            console.error('Error fetching favorite movies:', error);
        });
    };
    UserProfileComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService.editUser(this.userData).subscribe(function (updatedUser) {
            _this.snackBar.open('User profile updated successfully', 'OK', {
                duration: 2000
            });
            localStorage.setItem('user', JSON.stringify(updatedUser));
            _this.getUser(); // refresh user data
        }, function (error) {
            _this.snackBar.open('Failed to update user profile', 'OK', {
                duration: 2000
            });
            console.error('Error updating user:', error);
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
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        this.userService.deleteFavoriteMovie(user.Username, movieId).subscribe(function () {
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
