import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-bottom-sheet-tag-cloud-done',
  templateUrl: './bottom-sheet-tag-cloud-done.component.html',
  styleUrls: ['./bottom-sheet-tag-cloud-done.component.css']
})
export class BottomSheetTagCloudDoneComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetTagCloudDoneComponent>
  ) { }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
