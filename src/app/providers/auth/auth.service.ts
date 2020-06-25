import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../interfaces/user-details';



@Injectable({
  providedIn:'root'
})

export class AuthService {

  apiUrl = 'http://127.0.0.1:8000';
  errorData: {};
  redirectUrl: string;


  
private http: HttpClient;

constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
}

  public login(email: string , password: string):Observable<any>  {
    return this.http.post<any>(`${this.apiUrl}/api/login`, {email: email, password: password})
    .pipe(map(data => {
        if (data && data.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          console.log("User login successfully")
        }
      }),
      catchError(this.handleError)
    )
  }



  public register( user: User):Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/api/register`,user, {
      headers: {'Content-Type':'application/json'}
    }).pipe(map(() => {
      console.log("Registration successfull")
    }),
    catchError(this.handleError)
  );
  }


  public profile (): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/user`,{
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    }).pipe(map(data => {
        if (data) {
          localStorage.setItem('user_data', JSON.stringify(data));
        }
      }),
      catchError(this.handleError)
    )
  }


  public getUserById (id): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getUser/${id}`,{
      headers:  {'Content-Type':'application/json'}
    })
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getUsers`,{
      headers:  {'Content-Type':'application/json'}
    }).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public getAdminByUserId (id): Observable<any> {
    console.log(this.getAuthorizationToken())
    return this.http.get(`${this.apiUrl}/api/getUser/${id}`,{
      headers: { Authorization: `Bearer ${this.getAuthorizationToken()}`}
    })
  }


  public isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }



  public getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.access_token;
  }

  public getUserData() {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    return user_data;
  }



  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user_data');
  }
  

  public deleteUser(idUser) {
    return this.http.delete(`${this.apiUrl}/api/delete/${idUser}`, {
      headers: {'Content-Type':'application/json'}
    }).pipe(map(this.extractData),
    catchError(this.handleError)
  );
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

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  

}
