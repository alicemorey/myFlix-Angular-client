"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WelcomePageComponent = void 0;
var core_1 = require("@angular/core");
var user_login_form_component_1 = require("../user-login-form/user-login-form.component");
var user_registration_form_component_1 = require("../user-registration-form/user-registration-form.component");
var WelcomePageComponent = /** @class */ (function () {
    function WelcomePageComponent(dialog) {
        this.dialog = dialog;
    }
    WelcomePageComponent.prototype.ngOnInit = function () {
    };
    /**
     * Function that will open the dialog when the signup button is clicked
     */
    WelcomePageComponent.prototype.openUserRegistrationDialog = function () {
        this.dialog.open(user_registration_form_component_1.UserRegistrationFormComponent, {
            width: '280px'
        });
    };
    /**
     * Function to open user login dialog
     */
    WelcomePageComponent.prototype.openUserLoginDialog = function () {
        this.dialog.open(user_login_form_component_1.UserLoginFormComponent, {
            width: '280px'
        });
    };
    WelcomePageComponent = __decorate([
        core_1.Component({
            selector: 'app-welcome-page',
            templateUrl: './welcome-page.component.html',
            styleUrls: ['./welcome-page.component.scss']
        })
    ], WelcomePageComponent);
    return WelcomePageComponent;
}());
exports.WelcomePageComponent = WelcomePageComponent;
