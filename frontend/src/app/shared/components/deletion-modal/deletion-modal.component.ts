import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-deletion-modal',
  templateUrl: './deletion-modal.component.html',
  styleUrls: ['./deletion-modal.component.scss'],
})
export class DeletionModalComponent {
  @Output() deleteClicked = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<DeletionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.deleteClicked.emit(true);
    console.log('deleteClicked event emitted:', this.deleteClicked);
    this.dialogRef.close();
  }
}
