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
    @Inject(MAT_DIALOG_DATA) public data:any  // Receive user data
  ){}

  onConfirmDelete(): void {
    const Username = this.data.Username;

    //process the deleted data herer
    this.FetchApiDataService.deleteUser(Username).subscribe({
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

