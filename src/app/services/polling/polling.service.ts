// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {Observable, retry, share, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
// import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class PollingService {
//
//    stopPolling = new Subject();
//    allCurrencies$: Observable<string[]>;
//
//   constructor(private http: HttpClient) {
//     this.allCurrencies$ = timer(1, 1000).pipe(
//       switchMap(() => http.get<JsonArray>('http://localhost:4200/home')),
//       retry(),
//       tap(console.log),
//       share(),
//       takeUntil(this.stopPolling)
//     );
//   }
//
//
//   getAllCurrencies(): Observable<string[]> {
//     return this.allCurrencies$.pipe(
//       tap(() => console.log('data sent to subscriber'))
//     );
//   }
//
//   ngOnDestroy() {
//     this.stopPolling.next(this.allCurrencies$);
//   }
// }
