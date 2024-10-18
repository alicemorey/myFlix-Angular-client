import { Component, OnInit, Input } from '@angular/core';
//use this import to close the dialog on success
import { MatDialogRef} from '@angular/material/dialog';
//brings in the API calls created in 6.2
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {FetchApiDataService} from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }
    ngOnInit(): void {
  }

  /**
   * Function to login a user 
   */

  loginUser(): void {
     this.FetchApiDataService.userLoginService(this.userData).subscribe(
      (result:any) => {
       console.log(result);
       
       this.dialogRef.close();
       this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
      });
       //store user and token in localStorage
       localStorage.setItem('user', JSON.stringify(result.user));
       localStorage.setItem('token', result.token);
       this.router.navigate(['movies']);


     }, 
     (error:any) => {       
      this.snackBar.open(error, 'NOT OK', {
      duration: 2000
     });
    });
}
}
