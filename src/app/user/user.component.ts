import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from "../login-form/login-form.component";
import { SignupFormComponent } from "../signup-form/signup-form.component";
import { UserDataService } from '../service/user-data.service';
import { AdminComponent } from "../admin/admin.component";
import { OwnerComponent } from "../owner/owner.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [JsonPipe, LoginFormComponent, SignupFormComponent, AdminComponent, OwnerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  
  userLoggedIn: any;
  private userData = inject(UserDataService);
  typeOfUser : string = ''; 
  message : string = 'Loading...';


  ngOnInit(): void {
    this.userLoggedIn = this.userData.getData('userLoggedIn');
    this.typeOfUser = this.userLoggedIn.typeOfUser;
    this.message = 'Something went wrong...'
  }


}
