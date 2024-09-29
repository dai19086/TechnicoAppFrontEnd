import { Component, inject, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  userLoggedIn: any;
  private userData = inject(UserDataService);
  router = inject(Router);

  address : string = '';
  editAddress : boolean = false;
  phoneNumber : string = '';
  editPhoneNumber : boolean = false;


  ngOnInit(): void {
    this.userLoggedIn = this.userData.getData('userLoggedIn');
  }

  openEditSpace(space : string){
    if (space == 'address'){
      this.editAddress = true
    }else if (space == 'phoneNumber'){
      this.editPhoneNumber = true
    }

  }

  closeEditSpace(space : string){
    if (space == 'address'){
      this.editAddress = false
      this.userLoggedIn.address = this.address;
    }else if (space == 'phoneNumber'){
      this.editPhoneNumber = false
      this.userLoggedIn.phoneNumber = this.phoneNumber;
    }
  }

  saveChanges(){
    this.router.navigate(['home']);
  }
}
