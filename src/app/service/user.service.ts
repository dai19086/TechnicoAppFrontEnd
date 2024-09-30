import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  hostUrl = 'http://localhost:8080/Technico/resources/';

  getUsers(url: string) {
    return this.http.get(url);
  }

  logIn(userData: any){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'owner/login', JSON.stringify(userData),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong...'))
    )
  }

  saveUser(user: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'owner/saveOwner', JSON.stringify(user),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong...'))
    )
  }

  deleteUser(userId : number){
    return this.http.delete(this.hostUrl + 'owner/deleteOwner/' + userId)
  }

  constructor() { }
}
