import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //inject HttpClient
  http = inject(HttpClient)
  //set standard url without the endpoints part
  hostUrl = 'http://localhost:8080/Technico/resources/';

  //GET OWNER BY VAT
  searchUser(userVat : string){
    console.log(this.hostUrl + 'owner/getOwnerByVat/' + userVat)
    return this.http.get(this.hostUrl + 'owner/getOwnerByVat/' + userVat);
  }

  //POST LOGIN
  logIn(userData: any){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'owner/login', JSON.stringify(userData),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong...'))
    )
  }

  //POST SAVE OWNER
  saveUser(user: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'owner/saveOwner', JSON.stringify(user),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong while saving the User...'))
    )
  }

  //DELETE OWNER BY ID
  deleteUser(userId : number){
    return this.http.delete(this.hostUrl + 'owner/deleteOwner/' + userId);
  }

  //GET PROPERTY BY E9
  searchProperty(e9: string){
    return this.http.get(this.hostUrl + 'property/getPropertyByE9/' + e9);
  }

  //POST SAVE PROPERTY
  saveProperty(property: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.hostUrl + 'property/saveProperty', JSON.stringify(property),  {headers: headers }).
    pipe(
      retry(1),
      catchError(error => throwError(() => 'Something went wrong while saving the Property...'))
    )
  }

  //DELETE PROPERTY BY ID
  deleteProperty(propertyId : number){
    return this.http.delete(this.hostUrl + 'property/deleteProperty/' + propertyId);
  }

  //GET UNANSWERED REPAIRS FOR USER WITH VAT
  getUserUnansweredRepairs(userVat : number){
    return this.http.get(this.hostUrl + 'repair/getAllUnansweredRepairs/' + userVat);
  }

  //GET ALL REPAIRS FOR USER WITH VAT
  getUserRepairs (userVat : number){
    if (!userVat) {
      console.log('WARNING!!!')
      userVat = 0;
    }
    return this.http.get(this.hostUrl + 'repair/getAllRepairs/' + userVat);
  }

  //POST SAVE REPAIR
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
