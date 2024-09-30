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

  userLoggedIn: any;
  private userData = inject(UserDataService);
  private apiService = inject(UserService);
  router = inject(Router);
  typeOfUser: string = '';
  message: string = 'Loading...';


  ngOnInit(): void {
    this.userLoggedIn = this.userData.getData('userLoggedIn');
    this.typeOfUser = this.userLoggedIn.typeOfUser;
    this.message = 'Something went wrong...'
  }

  editUser() {
    this.router.navigate(['editUser'])
  }

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
