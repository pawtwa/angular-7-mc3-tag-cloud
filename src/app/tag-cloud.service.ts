import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable()
export class TagCloudService {
  finished: Subject<Object> = new Subject();

  constructor() {}

  private generateTagCloudFromText(text: string): Object {
    text = text.replace(/[^A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9]/g, ' ');
    let helper = {tags: null, words: null, stats: {countMax: 0, countMin: 0}};
    let items = {};
    let initialValue = [];
    let words = { };
    const tags = text.split(' ').filter((value) => value.length)/*.sort()*/.reduce<Object>((pV, cV, cI, arr) => {
      cV = cV.toLocaleLowerCase();
      if (!items[cV]) {
        items[cV] = initialValue.length;
      }
      (() => {
        if (!words[cV.length] && cV.length > 2) {
          words[cV.length] = {
            word: cV,
            fontSize: Math.floor(Math.random() * 52) + 12
          }
        }
      })();
      !initialValue[items[cV]]
        ? (initialValue.push({tag: cV, count: 1, url: `#${cV}`})) 
        : initialValue[items[cV]].count++;
      helper.stats.countMax < initialValue[items[cV]].count 
        ? (helper.stats.countMax = initialValue[items[cV]].count) 
        : null;
        helper.stats.countMin > initialValue[items[cV]].count || helper.stats.countMin === 0 
        ? (helper.stats.countMin = initialValue[items[cV]].count) 
        : null;
      return initialValue;
    }, initialValue);
    helper.tags = tags;
    helper.words = words;
    return helper;
  }

  generate(data: string) {
    timer(1500).subscribe((_) => {
      this.finished.next(this.generateTagCloudFromText(data));
    });
  }

  processToShow(tagCloud: Object, minFontSize: number = 12, maxFontSize: number = 56) {
    const {countMax, countMin} = tagCloud['stats'];
    const calcFontSize = (count: number): number => {
      return Math.floor(((count - countMin) / (countMax - countMin) * (maxFontSize - minFontSize)) + minFontSize);
    };
    for (let tag of tagCloud['tags']) {
      tag['fontSize'] = calcFontSize(tag['count']);
    }
  }
}
