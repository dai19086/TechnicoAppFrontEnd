import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userData: any = {};

  setData(key: string, value: any) {
    this.userData[key] = value;
  }

  getData(key: string): any {
    return this.userData[key];
  }

  removeData(key: string) {
    if (this.userData[key]) {
      delete this.userData[key];
    }
  }

  clearAllData() {
    this.userData = {};
  }
  
  constructor() { }
}
