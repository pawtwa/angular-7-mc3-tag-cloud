import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, timer, Observable } from 'rxjs';
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

  taskRequirements: any[] = [];
  checkRequirements: Observable<boolean>[] = [];
  error: string;

  private delayAfterGetWords: number = 500;
  private delayDialogs: number = 2000;

  constructor(
    private tagCloudService: TagCloudService,
    private ui: UiService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.generateTagCloud();
  }

  ngOnDestroy() {
    this.getWordsSubscription ? this.getWordsSubscription.unsubscribe() : null;
  }

  generateTagCloud() {
    this.words = null;
    this.error = null;
    timer(0).subscribe((_) => {
      this.showLoader();
      this.checkRequirements.length = taskRequirements.length;
      this.taskRequirements = taskRequirements;
      this.getWordsSubscription = this.tagCloudService.getWords().subscribe(
        (response: WordsInterface) => {
          timer(this.delayAfterGetWords).subscribe((_) => {
            this.words = response;
            this.checkWords();
            this.hideLoader();
            this.openBottomSheet();
          });
        },
        (error) => {
          timer(this.delayAfterGetWords).subscribe((_) => {
            this.error = error;
            this.hideLoader();
            this.openSnackBar(error);
          });
        }
      );
    });
  }

  checkWords() {
    for (let i in this.taskRequirements) {
      this.checkRequirements[i] = this.taskRequirements[i].check$(this.words);
    }
  }

  onWordClick(event: Event, word: string) {
    alert(word);
  }

  openSnackBar(message: string, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: this.delayDialogs,
    });
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetTagCloudDoneComponent).afterOpened().subscribe(() => {
      timer(this.delayDialogs).subscribe((_) => {
        this.bottomSheet.dismiss();
      })
    });
  }

  private showLoader() {
    this.ui.spin$.next(true);
  }

  private hideLoader() {
    this.ui.spin$.next(false);
  }
}
