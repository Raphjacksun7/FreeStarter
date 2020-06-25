import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  apiUrl = 'http://127.0.0.1:8000';
  errorData: {};
  redirectUrl: string;

  private http: HttpClient;

  constructor(handler: HttpBackend) {
      this.http = new HttpClient(handler);
     // this.comingData = this.comingDataSubject.asObservable();
  }
  
  public getImage(filename): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getImage/${filename}`,{
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.access_token;
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
  

}
