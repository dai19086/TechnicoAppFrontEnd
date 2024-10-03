import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to localy store data needed from multiple components.
 */
export class UserDataService {

  //field  with object to store the  data
  private userData: any = {};

  //data setter with key and value
  setData(key: string, value: any) {
    this.userData[key] = value;
  }

  //data getter by key
  getData(key: string): any {
    return this.userData[key];
  }

  //delete data by key
  removeData(key: string) {
    if (this.userData[key]) {
      delete this.userData[key];
    }
  }

  //clear userData reset field to empty object
  clearAllData() {
    this.userData = {};
  }
  
  constructor() { }
}
