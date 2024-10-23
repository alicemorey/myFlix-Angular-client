import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  @Output() confirmDelete = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>, 
    private FetchApiDataService: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }  // Receive user data
  ){}

  onConfirmDelete(): void {
    if (!this.data || !this.data.user) {
      console.error('User data is missing!');
      return;
    }

    console.log('User object:', this.data.user.userId);  // Check what is being passed
  
    //process the deleted data herer
    this.FetchApiDataService.deleteUser(this.data.user.userId).subscribe({
      next:()=>{
        console.log('User deleted successfully');
        this.confirmDelete.emit();
        this.dialogRef.close();
      },

      error:(err)=>{
        console.error('Error deleting user:', err);
    
      }
    });
  }

  onCancelDelete(): void {
    this.dialogRef.close(false);
  }
}

