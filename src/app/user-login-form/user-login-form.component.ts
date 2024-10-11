import { Component, OnInit, Input } from '@angular/core';
//use this import to close the dialog on success
import { MatDialogRef} from '@angular/material/dialog';
//brings in the API calls created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';
// used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
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
     this.fetchApiData.userLogin(this.userData).subscribe((result) => {
       this.dialogRef.close(); // This will close the modal on success!
       console.log(result);
       //store user and token in localStorage
       localStorage.setItem('user', JSON.stringify(result.user));
       localStorage.setItem('token', result.token);
       this.snackBar.open('user logged in successfully!', 'OK', {
         duration: 2000
       });
       this.router.navigate(['movies']);
     }, (error) => {        console.log(error);   
      this.snackBar.open(error, 'OK', {
      duration: 2000
     });
    });
}
  }
