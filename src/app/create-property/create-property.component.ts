import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLinkActive],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.css'
})
export class CreatePropertyComponent implements OnInit{

  propertyCreation!: FormGroup;
  errorMessage: string = '';
  successfulPropertySave = false;
  savePropertyButtonText = 'Add Property'
  propertyTypes: string[] = ['DETACHED_HOUSE', 'MAISONETTE', 'APARTMENT_BUILDING'];

  fb = inject(FormBuilder)
  private apiService = inject(UserService);
  private userData = inject(UserDataService);

  ngOnInit(): void {
    this.propertyCreation = this.fb.group({
      e9: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      address: ['', [Validators.required]],
      yearOfConstruction: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(4), Validators.maxLength(4)]],
      typeOfProperty: ['', [Validators.required, Validators.pattern("^[A-Z_]+$")]],
      propertyOwner: [this.userData.getData('userLoggedIn')]
    });
  }

  get e9() {
    return this.propertyCreation.get('e9');
  }

  get address() {
    return this.propertyCreation.get('address');
  }

  get yearOfConstruction() {
    return this.propertyCreation.get('yearOfConstruction');
  }

  get typeOfProperty() {
    return this.propertyCreation.get('typeOfProperty');
  }

  addProperty(){
    this.savePropertyButtonText = 'Saving Property...'

    if (this.propertyCreation.valid){
      this.apiService.saveProperty(this.propertyCreation.value).subscribe({
        next: (response : any) => {
          if (response == -1) {
            this.errorMessage = 'Property save failed...The E9 you entered is already used up.';
            this.savePropertyButtonText = 'Save Property';    
          }else{
            this.successfulPropertySave = true;
            this.errorMessage = '';
            this.savePropertyButtonText = 'Save Property';
          }
        },
        error: err => console.error(`ERROR WHILE SAVING PROPERTY... ${err}`),
        complete: () => console.log('Property Save stream complete...')
      });
    }

  }

}
