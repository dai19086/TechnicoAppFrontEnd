import { Component, inject, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { UserComponent } from "../user/user.component";
import { LandingPageComponent } from "../landing-page/landing-page.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UserComponent, LandingPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  //field  retrieve the logged in user if any
  userLoggedIn: any;
  //inject service that contains the logged in user
  private userData = inject(UserDataService);

  ngOnInit(): void {
    //retrieve the userLoggedIn if there is any
    this.userLoggedIn = this.userData.getData('userLoggedIn');
  }

  /**
   * Method for log out button.
   * Cleans the userData service's data and reinitiallizes the  userLoggedIn back to empty.
   */
  logOut(){
    this.userData.clearAllData();
    this.userLoggedIn = this.userData.getData('userLoggedIn');
  }
}
