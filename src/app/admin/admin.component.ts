import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  viewUserSearch: boolean = false;
  findOwnerForm!: FormGroup;
  ownerErrorMsg: string = '';
  userFound: any;

  viewPropertySearch: boolean = false;
  findPropertyForm!: FormGroup;
  propertyErrorMsg: string = '';
  propertyFound: any;


  ownerPropertiesVisible: boolean = false;

  fb = inject(FormBuilder);
  private apiService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    this.findOwnerForm = this.fb.group({
      vatNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
    this.findPropertyForm = this.fb.group({
      e9: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  get vatNumber() {
    return this.findOwnerForm.get('vatNumber');
  }

  get e9() {
    return this.findPropertyForm.get('e9');
  }

  openSearch(choice: string) {
    if (choice == 'User') {
      this.viewUserSearch = true;
      this.viewPropertySearch = false;
    }
    if (choice == 'Property') {
      this.viewUserSearch = false;
      this.viewPropertySearch = true;
    }
  }

  searchUser() {
    if (this.findOwnerForm.valid) {
      this.apiService.searchUser(this.vatNumber?.value).subscribe({
        next: response => {
          console.log(response);
          this.userFound = response;
          //if (id=-1) it means something went wrong and the user wasn't found
          if (this.userFound.ownerId == -1) {
            this.ownerErrorMsg = 'User Not Found...';
            //since it wasn't successful empty the user
            this.userFound = null;
          } else {
            //if everything's okay hide the error message
            this.ownerErrorMsg = '';
          }
        },
        error: err => console.error(`ERROR WHILE SEARCHING FOR USER... ${err}`),
        complete: () => console.log('Searching by VAT stream complete...')
      });
    }
  }

  searchProperty() {
    if (this.findPropertyForm.valid) {
      this.apiService.searchProperty(this.e9?.value).subscribe({
        next: response => {
          console.log(response);
          this.propertyFound = response;
          //if (id=-1) it means something went wrong and the user wasn't found
          if (this.propertyFound.propertyId == -1) {
            this.propertyErrorMsg = 'Property Not Found...';
            //since it wasn't successful empty the user
            this.propertyFound = null;
          } else {
            //if everything's okay hide the error message
            this.propertyErrorMsg = '';
          }
        },
        error: err => console.error(`ERROR WHILE SEARCHING FOR PROPERTY... ${err}`),
        complete: () => console.log('Searching by E9 stream complete...')
      });
    }
  }

  deleteOwner() {
    if (this.userFound.ownerId && this.userFound.ownerId != -1) {
      const confirmed = confirm('Are you sure you want to delete User ' + this.userFound.name + ' ' + this.userFound.surname + '?');
      if (confirmed) {
        this.apiService.deleteUser(this.userFound.ownerId).subscribe({
          next: (response: any) => {
            if (response) {
              console.log('User ' + this.userFound.name + ' DELETED!')
              this.userFound = null;
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

  deleteProperty() {
    if (this.propertyFound.propertyId && this.propertyFound.propertyId != -1) {
      const confirmed = confirm('Are you sure you want to delete this Property?');
      if (confirmed) {
        this.apiService.deleteProperty(this.propertyFound.propertyId).subscribe({
          next: (response: any) => {
            if (response) {
              console.log('Property DELETED!')
              this.propertyFound = null;
            } else {
              console.log('Response:' + response + ' Failed to delete Property...');
            }
          },
          error: err => console.log('ERROR WHILE DELETING THE PROPERTY....'),
          complete: () => console.log('Delete stream complete...')
        });
      }
    }
  }

  addRepair() {
    if (this.propertyFound) {
      this.router.navigate(['addRepair'],{queryParams:{ propertyToRepair: JSON.stringify(this.propertyFound) }});
    }
  }

}
