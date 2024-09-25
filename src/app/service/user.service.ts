import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  getUsers(url : string){
    return this.http.get(url);
  }

  ping(){
    return this.getUsers('http://localhost:8080/Technico/resources/general/ping');
  }

  constructor() { }
}
