import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, mergeMap, iif, tap, defer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return of(window.localStorage.getItem('isDay') as string).pipe(
      tap((isDay) => {
        console.log('isDay', isDay);
        console.log(`現在是：${isDay === 'Y' ? '白天' : '晚上'}`);
      }),
      mergeMap((isDay) =>
        // 判斷是否為白天 (錯誤示範)
        iif(
          () => isDay === 'Y',
          // 白天可以進去森林
          of(true),
          // 晚上不能進去森林
          this.router.navigate(['/error'])
        )
        // // 判斷是否為白天 (正確示範)
        // iif(
        //   () => isDay === 'Y',
        //   // 白天可以進去森林
        //   of(true),
        //   // 晚上不能進去森林
        //   defer(() => this.router.navigate(['/error']))
        // )
      )
    );
  }


}
