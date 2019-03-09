import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable()
export class UiService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
  spin$: Subject<boolean> = new Subject();

  constructor(
    private overlay: Overlay,
  ) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) { this.showSpinner() }
          else if (res == 0) {
            this.spinnerRef.hasAttached() ? this.stopSpinner() : null;
          }
        })
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    })
  }

  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner))
  }

  stopSpinner() {
    this.spinnerRef.detach();
  }
}
