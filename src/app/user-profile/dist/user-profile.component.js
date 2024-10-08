"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        this.FavoriteMovies = [];
        this.userData = JSON.parse(localStorage.getItem("user") || "{}");
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.getFavoriteMovies();
    };
    UserProfileComponent.prototype.editUser = function () {
        var _this = this;
        this.userService.editUser(this.userData).subscribe(function (res) {
            _this.userData = __assign(__assign({}, res), { id: res._id, password: _this.userData.password, token: _this.userData.token });
            localStorage.setItem("user", JSON.stringify(_this.userData));
            console.log(_this.userData);
        });
    };
    UserProfileComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService.editUser(this.userData).subscribe(function (updatedUser) {
            _this.snackBar.open('User profile updated successfully', 'OK', {
                duration: 2000
            });
            localStorage.setItem('user', JSON.stringify(updatedUser));
            _this.editUser(); // refresh user data
        }, function (error) {
            _this.snackBar.open('Failed to update user profile', 'OK', {
                duration: 2000
            });
            console.error('Error updating user:', error);
        });
    };
    UserProfileComponent.prototype.resetUser = function () {
        this.userData = JSON.parse(localStorage.getItem("user") || "{}");
    };
    UserProfileComponent.prototype.getFavoriteMovies = function () {
        var _this = this;
        this.userService.getAllMovies().subscribe(function (resp) {
            _this.FavoriteMovies = resp.filter(function (m) {
                return _this.userData.FavoriteMovies.includes(m._id);
            });
            console.log('Favorite movies :', _this.FavoriteMovies);
        });
    };
    UserProfileComponent.prototype.removeFromFavorites = function (movieId) {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        this.userService.deleteFavoriteMovies(user.Username, movieId).subscribe(function () {
            _this.snackBar.open('Movie removed from favorites', 'OK', {
                duration: 2000
            });
            _this.getFavoriteMovies();
        });
    };
    UserProfileComponent.prototype.deleteUser = function () {
        var _this = this;
        this.userService.deleteUser().subscribe(function () {
            localStorage.clear();
            _this.router.navigate(['/welcome']);
            _this.snackBar.open('User deleted successfully', 'OK', {
                duration: 2000
            });
        });
    };
    UserProfileComponent.prototype.logOut = function () {
        localStorage.clear();
        this.router.navigate(['/welcome']);
    };
    UserProfileComponent.prototype.navigateToMovies = function () {
        this.router.navigate(['/movies']);
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
