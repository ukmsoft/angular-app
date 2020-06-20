import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<any> {
    return this.httpClient.get('assets/items.json').pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    console.log('Error', error);
    return throwError(error);
  }
}
