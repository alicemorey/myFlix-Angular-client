
import { UserRegistrationService } from '../fetch-api-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserRegistrationService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateUser(): void {
    this.userService.editUser(this.user).subscribe(
      (response: any) => {
        console.log('User updated successfully');
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }
}

