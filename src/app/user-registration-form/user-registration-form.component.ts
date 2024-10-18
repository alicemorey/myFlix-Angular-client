import { Component, OnInit, Input } from '@angular/core';
//use this import to close the dialog on success
import { MatDialogRef} from '@angular/material/dialog';
//brings in the API calls created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }
    ngOnInit(): void {
  }

  //this is the function responsible for sending the form inputs to the backend
  
  /**
   * Function to register a new user usin FetchAPI
   */
   registerUser(): void {
     this.FetchApiDataService.userRegistrationService(this.userData).subscribe({
       next: (response) => {
         // Logic for a successful user registration goes here! (To be implemented)
         this.dialogRef.close(); // This will close the modal on success!
        
         console.log(response); 
         this.snackBar.open('user registered successfully!', 'OK', {
           duration: 2000
         });
       },
       error: (error: Error) => {
         console.log('Full error response:', error);
         this.snackBar.open(error.message || 'Registration failed', 'OK', {
           duration: 2000
         });
       }
     });
}}

