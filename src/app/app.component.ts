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

  @ViewChild('tagCloud') tags: ElementRef<HTMLBaseElement>;

  constructor(
    private ui: UiService,
    private tagCloudService: TagCloudService
  ) { }

  ngOnInit() {}

  ngOnDestroy() {}
}
