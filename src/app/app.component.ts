import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UiService } from './ui.service';
import { NgModel } from '@angular/forms';
import { Observable, fromEvent, Subscription, timer } from 'rxjs';
import { TagCloudService } from './tag-cloud.service';

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
  text: NgModel;

  @ViewChild('textarea') input: ElementRef<HTMLBaseElement>;
  @ViewChild('tagCloud') tags: ElementRef<HTMLBaseElement>;

  private input$: Observable<Event>;
  private inputSubscription: Subscription;
  private inputTimer: any;
  private timer: Observable<any>;
  private timerSubscription: Subscription;

  private tagCloudFinishedSubscription: Subscription;

  constructor(
    private ui: UiService,
    private tagCloudService: TagCloudService
  ) { }

  ngOnInit() {
    this.initTimer();
    this.initInputEvent();
    this.tagCloudFinishedSubscription = this.tagCloudService.finished.subscribe((tagCloud: Object) => {
      this.afterTagCloudGeneration(tagCloud);
    });
  }

  ngOnDestroy() {
    this.timerSubscription ? this.timerSubscription.unsubscribe() : null;
    this.inputSubscription ? this.inputSubscription.unsubscribe() : null;
  }

  private initTimer() {
    this.timer = timer(1500);
  }

  private initInputEvent() {
    this.input$ = fromEvent(this.input.nativeElement, 'input');
    this.inputSubscription = this.input$.subscribe((_) => {
      this.timerSubscription ? this.timerSubscription.unsubscribe() : null;
      this.timerSubscription = this.timer.subscribe((_) => {
        this.triggerTagCloudGeneration();
      });
    });
  }

  private triggerTagCloudGeneration() {
    this.ui.spin$.next(true);
    this.tagCloudService.generate(this.text.toString());
  }

  private afterTagCloudGeneration(tagCloud: Object) {
    this.tagCloudService.processToShow(tagCloud);
    this.showTagCloud(tagCloud);
    this.ui.spin$.next(false);
  }

  private showTagCloud(tagCloud: Object) {
    this.tags.nativeElement.innerHTML = "";
    const colors = ['red', 'green', 'blue', 'pink', 'orange'];
    let counter = 0;
    for (const tag of tagCloud['tags']) {
      const colorIndex = counter % colors.length;
      this.tags.nativeElement.innerHTML += ` <a href="${tag['url']}" style="font-size: ${tag['fontSize']}px; color: ${colors[colorIndex]};">${tag['tag']}</a> `;
      counter++;
    }
  }
}
