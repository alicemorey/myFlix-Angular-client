import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  @Output() confirmDelete = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>) {}

  onConfirmDelete(): void {
    this.confirmDelete.emit();
    this.dialogRef.close(true);
  }

  onCancelDelete(): void {
    this.dialogRef.close(false);
  }
}

