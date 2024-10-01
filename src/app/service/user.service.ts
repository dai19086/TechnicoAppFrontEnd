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
      catchError(error => throwError(() => 'Something went wrong while saving the User...'))
    )
  }

  deleteUser(userId : number){
    return this.http.delete(this.hostUrl + 'owner/deleteOwner/' + userId);
  }

  saveProperty(property: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'property/saveProperty', JSON.stringify(property),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong while saving the Property...'))
    )
  }

  getUserUnansweredRepairs(userVat : number){
    return this.http.get(this.hostUrl + 'repair/getAllUnansweredRepairs/' + userVat);
  }

  getUserRepairs (userVat : number){
    if (!userVat) {
      console.log('WARNING!!!')
      userVat = 0;
    }
    return this.http.get(this.hostUrl + 'repair/getAllRepairs/' + userVat);
  }

  saveRepair(repair : any){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'repair/saveRepair', JSON.stringify(repair),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong while saving the Repair...'))
    )
  }

  constructor() { }
}
