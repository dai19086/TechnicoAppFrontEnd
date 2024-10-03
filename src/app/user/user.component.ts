import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from "../login-form/login-form.component";
import { SignupFormComponent } from "../signup-form/signup-form.component";
import { UserDataService } from '../service/user-data.service';
import { AdminComponent } from "../admin/admin.component";
import { OwnerComponent } from "../owner/owner.component";
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [JsonPipe, LoginFormComponent, SignupFormComponent, AdminComponent, OwnerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  //fields for user page management
  userLoggedIn: any;  //used to retrieve the logged in user
  typeOfUser: string = '';  //used to retrieve the logged in user's type
  message: string = 'Loading...'; //loading message
  //inject services
  private userData = inject(UserDataService);
  private apiService = inject(UserService);
  private router = inject(Router);


  ngOnInit(): void {
    //retrieve userLoggedIn data from userData service
    this.userLoggedIn = this.userData.getData('userLoggedIn');
    this.typeOfUser = this.userLoggedIn.typeOfUser;
    this.message = 'Something went wrong...'
  }

  /**
   * Method  for Edit User button
   * Redirects to the Edit User Page
   */
  editUser() {
    this.router.navigate(['editUser'])
  }

  /**
   * Method for Delete My Profile button
   * After asking for confirmation,
   * Calls the apiService to delete the currently userLoggedIn by ownerId.
   * If reponse is true (user deleted successfully) write it in the console,
   *  Remove its data from userData service.
   *  Redirect to Log In page. 
   * If it  wasn't write the error in the console.
   */
  deleteUser() {
    const confirmed = confirm('Are you sure you want to delete your User profile?');
    if (confirmed) {
      this.apiService.deleteUser(this.userLoggedIn.ownerId).subscribe({
        next: (response: any) => {
          if (response) {
            console.log('User ' + this.userLoggedIn.name + ' DELETED!')
            this.userData.removeData('userLoggedIn');
            this.router.navigate(['login']);
          } else {
            console.log('Response:' + response + ' Failed to delete user...');
          }
        },
        error: err => console.log('ERROR WHILE DELETING THE USER....'),
        complete: () => console.log('Delete stream complete...')
      });
    }

  }


}
