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
    function UserProfileComponent(userService) {
        this.userService = userService;
        this.user = {};
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    UserProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (response) {
            _this.user = response;
        }, function (error) {
            console.error('Error fetching user:', error);
        });
    };
    UserProfileComponent.prototype.updateUser = function () {
        this.userService.editUser(this.user).subscribe(function (response) {
            console.log('User updated successfully');
        }, function (error) {
            console.error('Error updating user:', error);
        });
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
