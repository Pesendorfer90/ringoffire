import { Component } from '@angular/core';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

allProfilePictures = ['icon-1.png', 'icon-2.png', 'icon-3.png', 'icon-4.png', 'icon-5.png', 'icon-6.png', 'icon-7.png', 'icon-8.png', 'icon-9.png', 'icon-10.png', 'icon-11.png', ]

constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

}
