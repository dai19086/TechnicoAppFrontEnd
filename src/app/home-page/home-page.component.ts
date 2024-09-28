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

  userLoggedIn: any;
  private userData = inject(UserDataService);

  ngOnInit(): void {
      this.userLoggedIn = this.userData.getData('userLoggedIn');
  }



}
