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
  //field to retrieve the logged in user
  userLoggedIn: any;
  //inject services needed
  private userData = inject(UserDataService);
  private router = inject(Router);
  private apiService = inject(UserService);

  errorMessage : string = '';

  //fields to get input
  vatNumber : string = '';
  address : string = '';
  phoneNumber : string = '';

  //flags to display input fields
  editVat : boolean = false;
  editAddress : boolean = false;
  editPhoneNumber : boolean = false;


  ngOnInit(): void {
    //OnInit get the logged in user to edit its fields
    this.userLoggedIn = this.userData.getData('userLoggedIn');
  }

  /**
   * Displays the input field for the clicked Edit Button.
   * Initializes the input field with the user's existing value.
   * @param space String that signals which field's edit button was pressed
   */
  openEditSpace(space : string){
    if (space == 'vatNumber'){
      this.editVat = true
      this.vatNumber = this.userLoggedIn.vatNumber;
    }else if (space == 'phoneNumber'){
      this.editPhoneNumber = true
      this.phoneNumber = this.userLoggedIn.phoneNumber;
    }else if (space == 'address'){
      this.editAddress = true
      this.address = this.userLoggedIn.address;
    }

  }

  /**
   * Hides the input field for the clicked Confirm Button.
   * Saves locally the value to be saved when the Save button is pressed.
   * @param space String that signals which field's confirm button was pressed
   */
  closeEditSpace(space : string){
    if (space == 'vatNumber'){
      this.editVat = false
      if (this.vatNumber) this.userLoggedIn.vatNumber = this.vatNumber;
    }else if (space == 'phoneNumber'){
      this.editPhoneNumber = false
      if (this.phoneNumber) this.userLoggedIn.phoneNumber = this.phoneNumber;
    }else if (space == 'address'){
      this.editAddress = false
      if (this.address) this.userLoggedIn.address = this.address;
    }
  }

  /**
   * Method for Save Button.
   * Calls the apiService to save the changes that have been made to the userLoggedIn.
   * If the changes were submitted successfully updates the userData service's values
   * and navigates user back to home (User) page.
   * If the changes weren't submitted successfully inform the user.
   * If an error was  thrown in the back end write it on the console.
   */
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
      error: err => {
        console.error(`ERROR WHILE SAVING CHANGES... ${err}`);
        this.errorMessage = 'Failed to save changes...';
      },
      complete: () => console.log('Saving stream complete...')
    });
    
  }
}
