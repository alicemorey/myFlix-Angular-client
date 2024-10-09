"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRegistrationFormComponent = void 0;
var core_1 = require("@angular/core");
var UserRegistrationFormComponent = /** @class */ (function () {
    function UserRegistrationFormComponent(fetchApiData, dialogRef, snackBar) {
        this.fetchApiData = fetchApiData;
        this.dialogRef = dialogRef;
        this.snackBar = snackBar;
        this.userData = { Username: '', Password: '', Email: '', Birthday: '' };
    }
    UserRegistrationFormComponent.prototype.ngOnInit = function () {
    };
    //this is the function responsible for sending the form inputs to the backend
    /**
     * Function to register a new user usin FetchAPI
     */
    UserRegistrationFormComponent.prototype.registerUser = function () {
        var _this = this;
        this.fetchApiData.userRegistration(this.userData).subscribe(function (response) {
            // Logic for a successful user registration goes here! (To be implemented)
            _this.dialogRef.close(); // This will close the modal on success!
            console.log(response);
            _this.snackBar.open('user resigisted successfully!', 'OK', {
                duration: 2000
            });
        }, function (response) {
            console.log(response);
            _this.snackBar.open(response, 'OK', {
                duration: 2000
            });
        });
    };
    __decorate([
        core_1.Input()
    ], UserRegistrationFormComponent.prototype, "userData");
    UserRegistrationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-user-registration-form',
            templateUrl: './user-registration-form.component.html',
            styleUrl: './user-registration-form.component.scss'
        })
    ], UserRegistrationFormComponent);
    return UserRegistrationFormComponent;
}());
exports.UserRegistrationFormComponent = UserRegistrationFormComponent;
