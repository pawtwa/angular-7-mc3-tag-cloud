import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { TagCloudService } from './tag-cloud.service';
import { UiService } from './ui.service';

import taskRequirements from '../assets/task-requirements';
import { WordsInterface } from '../assets/words';

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
    private ui: UiService
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
          });
        },
        (error) => {
          timer(this.delay).subscribe((_) => {
            this.error = error;
            this.hideLoader();
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

  private showLoader() {
    this.ui.spin$.next(true);
  }

  private hideLoader() {
    this.ui.spin$.next(false);
  }
}
