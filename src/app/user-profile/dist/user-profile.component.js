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
var message_box_component_1 = require("../message-box/message-box.component");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(fetchApiData, router, snackBar, fetchUsers, dialog) {
        this.fetchApiData = fetchApiData;
        this.router = router;
        this.snackBar = snackBar;
        this.fetchUsers = fetchUsers;
        this.dialog = dialog;
        this.userData = {
            username: '',
            password: '',
            email: '',
            birthday: ''
        };
        this.movies = [];
        this.user = {};
        this.favorites = [];
        this.FavoriteMovies = [];
        this.userData = JSON.parse(localStorage.getItem("user") || "{}");
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        // this.getUser();
        this.getFavoriteMovies();
    };
    //  getUser(): void {
    //   this.fetchApiData.getUser().subscribe((resp: any) => {
    //     this.userData = {
    //       ...resp,
    //  npm install --save-dev typedoc     id: resp._id,
    //       password: this.userData.password,
    //       token: this.userData.token
    //     };
    //     localStorage.setItem("user", JSON.stringify(this.userData));
    //     console.log(this.userData);
    //   });
    // }
    /**
     * Function to edit user using FetchApiData
     */
    UserProfileComponent.prototype.editUser = function () {
        var _this = this;
        this.fetchApiData.editUser(this.user.Username, this.userData).subscribe(function (res) {
            _this.userData = __assign(__assign({}, res), { id: res._id, password: _this.userData.password, token: _this.userData.token });
            localStorage.setItem("user", JSON.stringify(_this.userData));
            console.log(_this.userData);
        });
    };
    /**
    showGenreAlert(genre: any): void {
      alert(genre);
    }
    
    showDirectorAlert(director: any): void {
      alert(director);
    }
    
    showSynopsisAlert(synopsis: any): void {
      alert(synopsis);
    } */
    /**
     * Function to open a dialog box with movie details on genre
     * @param genre
     */
    UserProfileComponent.prototype.openGenreDialog = function (genre) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: 'Genre',
                content: genre
            },
            width: '350px'
        });
    };
    /**
     * Function to open a dialog box with movie details on director
     * @param movie
     */
    UserProfileComponent.prototype.openDirectorDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                title: movie.Director.Name,
                content: "Bio: " + movie.Director.Bio + "\nBirth: " + movie.Director.Birth
            },
            width: '350px'
        });
    };
    /**
     * Function to open a dialog box with movie details on synopsis
     * @param movie
     */
    UserProfileComponent.prototype.openSynopsisDialog = function (movie) {
        this.dialog.open(message_box_component_1.MessageBoxComponent, {
            data: {
                content: movie.Description
            },
            width: '350px'
        });
    };
    /**
     * Function to update user profile using FetchApiData
     */
    UserProfileComponent.prototype.updateUser = function () {
        var _this = this;
        this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(function (updatedUser) {
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
    /**
   * Function to get users favorite movies using FetchApiData
     */
    UserProfileComponent.prototype.getFavoriteMovies = function () {
        var _this = this;
        this.fetchApiData.getAllMovies().subscribe(function (resp) {
            _this.favorites = _this.FavoriteMovies = resp.filter(function (m) {
                return _this.userData.FavoriteMovies.includes(m._id);
            });
            console.log('Favorite movies :', _this.favorites);
        });
    };
    /**
       * Function to remove a movie from favorites
       * @param movieId
       */
    UserProfileComponent.prototype.removeFromFavorites = function (movieId) {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('user'));
        this.fetchApiData
            .deleteFavoriteMovies(user.Username, movieId)
            .subscribe(function (res) {
            console.log(res);
            //update local storage
            user.FavoriteMovies = user.FavoriteMovies.filter(function (id) { return id !== movieId; });
            localStorage.setItem('user', JSON.stringify(user));
            _this.getFavoriteMovies();
        });
        this.snackBar.open("movie removed from favorites", 'OK', {
            duration: 2000
        });
    };
    /**
     *
     * @param movieId
     * @returns favorite status of a movie
     */
    UserProfileComponent.prototype.isFavorite = function (movieId) {
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        var userFavorites = user.FavoriteMovies || [];
        return userFavorites.includes(movieId);
    };
    /**
     * Function to delete a user using FetchApiData
     *
    */
    UserProfileComponent.prototype.deleteUser = function () {
        var _this = this;
        var username = JSON.parse(localStorage.getItem('user') || '{}').Username;
        this.fetchApiData.deleteUser(username).subscribe(function () {
            localStorage.clear();
            _this.router.navigate(['/welcome']);
            _this.snackBar.open('User deleted successfully', 'OK', {
                duration: 2000
            });
        });
    };
    /**
     * Function to log out the user
     */
    UserProfileComponent.prototype.logOut = function () {
        localStorage.clear();
        this.router.navigate(['/welcome']);
    };
    /**
     * Fuction to navigate to movies page
     */
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
