import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { TagCloudService } from './tag-cloud.service';
import { UiService } from './ui.service';

import taskRequirements from '../assets/task-requirements';
import { WordsInterface } from '../assets/words';
import { BottomSheetTagCloudDoneComponent } from './bottom-sheet-tag-cloud-done/bottom-sheet-tag-cloud-done.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ 
    TagCloudService
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mc3-tag-cloud';

  @ViewChild('tagCloud') tags: ElementRef<HTMLBaseElement>;

  words: Object;
  private getWordsSubscription: Subscription;

  taskRequirements: string[];
  error: string;

  private delay: number = 1000;

  constructor(
    private tagCloudService: TagCloudService,
    private ui: UiService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    timer(0).subscribe((_) => {
      this.showLoader();
      this.taskRequirements = taskRequirements;
      this.getWordsSubscription = this.tagCloudService.getWords().subscribe(
        (response: WordsInterface) => {
          timer(this.delay).subscribe((_) => {
            this.words = response;
            this.hideLoader();
            this.openBottomSheet();
          });
        },
        (error) => {
          timer(this.delay).subscribe((_) => {
            this.error = error;
            this.hideLoader();
            this.openSnackBar(error);
          });
        }
      );
    });
  }

  ngOnDestroy() {
    this.getWordsSubscription ? this.getWordsSubscription.unsubscribe() : null;
  }

  onWordClick(event: Event, word: string) {
    alert(word);
  }

  openSnackBar(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetTagCloudDoneComponent);
  }

  private showLoader() {
    this.ui.spin$.next(true);
  }

  private hideLoader() {
    this.ui.spin$.next(false);
  }
}
