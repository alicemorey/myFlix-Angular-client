import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})

export class MessageBoxComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA)
        public data: {
            title: string,
            content: string
        },
        public dialogRef: MatDialogRef<MessageBoxComponent>
    ) {}

    ngOnInit(): void {}

    /**
     * Function to close the dialog box
     */
    closeMessageBox(): void {
        this.dialogRef.close();
    }

}