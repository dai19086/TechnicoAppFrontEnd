import { Component, inject, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

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
  private apiService = inject(UserService);

  errorMessage : string = '';

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
    this.apiService.saveUser(this.userLoggedIn).subscribe({
      next: (response : any) => {
        if (response.value == -1) {
          this.errorMessage = 'Failed to save changes...';
        }else{
          this.errorMessage = '';
          this.userData.setData('userLoggedIn', this.userLoggedIn);
          this.router.navigate(['home']);
        }
      },
      error: err => console.error(`ERROR WHILE SAVING CHANGES... ${err}`),
      complete: () => console.log('Saving stream complete...')
    });
    
  }
}
