"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var card_1 = require("@angular/material/card");
var form_field_1 = require("@angular/material/form-field");
var dialog_1 = require("@angular/material/dialog");
var snack_bar_1 = require("@angular/material/snack-bar");
var icon_1 = require("@angular/material/icon");
var app_component_1 = require("./app.component");
var user_registration_form_component_1 = require("./user-registration-form/user-registration-form.component");
var user_login_form_component_1 = require("./user-login-form/user-login-form.component");
var movie_card_component_1 = require("./movie-card/movie-card.component");
var welcome_page_component_1 = require("./welcome-page/welcome-page.component");
var user_profile_component_1 = require("./user-profile/user-profile.component");
var async_1 = require("@angular/platform-browser/animations/async");
var appRoutes = [
    { path: 'welcome', component: welcome_page_component_1.WelcomePageComponent },
    { path: 'movies', component: movie_card_component_1.MovieCardComponent },
    { path: 'profile', component: user_profile_component_1.UserProfileComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                user_registration_form_component_1.UserRegistrationFormComponent,
                user_login_form_component_1.UserLoginFormComponent,
                movie_card_component_1.MovieCardComponent,
                welcome_page_component_1.WelcomePageComponent,
                user_profile_component_1.UserProfileComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                card_1.MatCardModule,
                form_field_1.MatFormFieldModule,
                dialog_1.MatDialogModule,
                snack_bar_1.MatSnackBarModule,
                icon_1.MatIconModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            providers: [
                async_1.provideAnimationsAsync()
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
