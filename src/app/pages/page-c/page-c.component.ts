import { Component, OnInit } from '@angular/core';
import { connectable, share } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-page-c',
  templateUrl: './page-c.component.html',
  styleUrls: ['./page-c.component.css'],
})
export class PageCComponent implements OnInit {

  /** cold obs */
  userData$ = ajax.getJSON('../../../assets/data.json');

  /** warm obs ( create a connectable obs + connect )*/
  userData2$ = ajax.getJSON('../../../assets/data2.json').pipe(
    share()
  );

  /** warm obs 2 */
  // userData2$ = connectable(ajax.getJSON('../../../assets/data2.json'));

  constructor() {}

  ngOnInit(): void {
    // setTimeout(()=>{
    //   this. userData2$.connect();
    // },3000);
  }

}
