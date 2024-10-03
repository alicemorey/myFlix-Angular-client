import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent} from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appRoutes: Routes =[
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'movies', component: MovieCardComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: '', redirectTo: 'welcome', pathMatch:'prefix'},

];

@NgModule({
  declarations: [
    AppComponent, 
    UserRegistrationFormComponent, 
    UserLoginFormComponent, 
    MovieCardComponent, 
    WelcomePageComponent,
    UserProfileComponent, 
    MessageBoxComponent
],

  imports: [
    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forRoot (appRoutes),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


