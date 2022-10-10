import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { defer, EMPTY, from, iif, mergeMap, of, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
  styleUrls: ['./page-a.component.css'],
})
export class PageAComponent {
  checkboxFormControl = new FormControl(true);

  title = 'rxjs-defer-demo';

  constructor(private router: Router) {
    this.checkboxFormControl.valueChanges
      .pipe(startWith(this.checkboxFormControl.value))
      .subscribe((isDay) => {
        window.localStorage.setItem('isDay', isDay ? 'Y' : 'N');
      });
  }

  createConfirmPromise(): Promise<boolean> {
    return new Promise((resolve) => {
      var result = confirm('天黑了，是否要關燈睡覺？');
      resolve(result);
    });
  }

  buttonClick(): void {
    // console.log('buttonClick');

    // of(alert('現在白天啦，不用關燈!!')).pipe(mergeMap(() => EMPTY));

    // from(this.createConfirmPromise());

    // 獲得目前狀態 (白天 or 晚上)
    of(this.checkboxFormControl.value)
      .pipe(
        mergeMap((isDay) =>
          // 是否為白天?
          iif(
            () => !!isDay,
            // [Y] 直接提示不用關燈，且結束流程
            of(alert('現在白天啦，不用關燈!!')).pipe(mergeMap(() => EMPTY)),
            // [N] 彈出視窗，詢問晚上是否關燈
            this.createConfirmPromise()
          )
        ),
        mergeMap((alertResult) =>
          // 是否需要關燈睡覺?
          iif(
            () => alertResult,
            // [Y] 關燈睡覺
            of(alert('哪次不關燈')),
            // [N] 不關燈，且結束流程
            of(alert('小朋友才關燈，我們大人不用睡覺的')).pipe(
              mergeMap(() => EMPTY)
            )
          )
        )
      )
      .subscribe(() => {
        // 關燈
        document.querySelector('html')?.setAttribute('data-theme', 'dark');
      });
  }

  buttonClick2(): void {
    // console.log('buttonClick2');

    // defer(() => of(alert('現在白天啦，不用關燈!!'))).pipe(
    //   mergeMap(() => EMPTY)
    // );

    // defer(() => this.createConfirmPromise());

    // 獲得目前狀態(白天 or 晚上)
    of(this.checkboxFormControl.value)
      .pipe(
        mergeMap((isDay) =>
          // 是否為白天?
          iif(
            () => !!isDay,
            // [Y] 直接提示不用關燈，且結束流程
            defer(() => of(alert('現在白天啦，不用關燈!!'))).pipe(
              mergeMap(() => EMPTY)
            ),
            // [N] 彈出視窗，詢問晚上是否關燈
            defer(() => this.createConfirmPromise())
          )
        ),
        mergeMap((alertResult) =>
          // 是否需要關燈睡覺?
          iif(
            () => alertResult,
            // [Y] 關燈睡覺
            defer(() => of(alert('哪次不關燈'))),
            // [N] 不關燈，且結束流程
            defer(() => of(alert('小朋友才關燈，我們大人不用睡覺的'))).pipe(
              mergeMap(() => EMPTY)
            )
          )
        )
      )
      .subscribe((result) => {
        // 關燈
        document.querySelector('html')?.setAttribute('data-theme', 'dark');
      });
  }

  buttonClick3(): void {
    document.querySelector('html')?.setAttribute('data-theme', 'light');
  }

  buttonClick4(): void {
    this.router.navigate(['/b-page']);
  }
}
