"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserLoginFormComponent = void 0;
var core_1 = require("@angular/core");
var UserLoginFormComponent = /** @class */ (function () {
    function UserLoginFormComponent(FetchApiDataService, dialogRef, snackBar, router) {
        this.FetchApiDataService = FetchApiDataService;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.router = router;
        this.userData = { Username: '', Password: '' };
    }
    UserLoginFormComponent.prototype.ngOnInit = function () {
    };
    /**
     * Function to login a user
     */
    UserLoginFormComponent.prototype.loginUser = function () {
        var _this = this;
        this.FetchApiDataService.userLoginService(this.userData).subscribe(function (result) {
            console.log(result);
            _this.dialogRef.close();
            _this.snackBar.open('user logged in successfully!', 'OK', {
                duration: 2000
            });
            //store user and token in localStorage
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', result.token);
            _this.router.navigate(['movies']);
        }, function (error) {
            _this.snackBar.open(error, 'NOT OK', {
                duration: 2000
            });
        });
    };
    __decorate([
        core_1.Input()
    ], UserLoginFormComponent.prototype, "userData");
    UserLoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-user-login-form',
            templateUrl: './user-login-form.component.html',
            styleUrl: './user-login-form.component.scss'
        })
    ], UserLoginFormComponent);
    return UserLoginFormComponent;
}());
exports.UserLoginFormComponent = UserLoginFormComponent;
