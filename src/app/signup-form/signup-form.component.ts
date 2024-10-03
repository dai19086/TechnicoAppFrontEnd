import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent implements OnInit {
  //fields for Sign Up
  signUpForm!: FormGroup;
  errorMessage: string = '';
  signUpButtonText = 'Sign Up'
  types: string[] = ['OWNER', 'ADMIN'];
  //inject services
  private fb = inject(FormBuilder)
  private apiService = inject(UserService);
  private router = inject(Router);

  minLen: number = 4; //password minimum length


  ngOnInit(): void {
    //initialize the sign up form
    this.signUpForm = this.fb.group({
      vatNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z\u0370-\u03FF]+$")]],
      surname: ['', [Validators.required, Validators.pattern("^[a-zA-Z\u0370-\u03FF]+$")]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLen), Validators.pattern("^[a-zA-Z0-9@]+$")]],
      typeOfUser: ['', [Validators.required, Validators.pattern("^[A-Z]+$")]]
    });
  }

  get vatNumber() {
    return this.signUpForm.get('vatNumber');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get surname() {
    return this.signUpForm.get('surname');
  }

  get address() {
    return this.signUpForm.get('address');
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password')
  }

  get typeOfUser() {
    return this.signUpForm.get('typeOfUser')
  }

  /**
   * Method for Sign Up Form.
   * When the Sign Up Button is click, change the button's text to signal that the sign up process is underway.
   * If the form is valid,
   * Call the apiService method to Sign Up.
   * If everything's okay hide the error message.
   *  Reset the button's text.
   *  Redirect to the Log In page for the user to log in the app.
   * If (response = -1) it means something went wrong while saving the new userin at the server.
   *  This should be caused by the Vat or Email given, that are unique fields, being used by another already signed up user.
   *  Let user know and reset the button's text
   * If another error was thrown by the server write it in the console.
   */
  signUpUser() {
    this.signUpButtonText = 'Signing Up...';

    if (this.signUpForm.valid) {
      this.apiService.saveUser(this.signUpForm.value).subscribe({
        next: (response : any) => {
          if (response == -1) {
            this.errorMessage = 'Sign Up failed...The VAT or Email you entered are already used up.';
            this.signUpButtonText = 'Sign Up';    
          }else{
            this.errorMessage = '';
            this.signUpButtonText = 'Sign Up';  
            this.router.navigate(['login']);
          }
        },
        error: err => console.error(`ERROR WHILE SIGNING UP... ${err}`),
        complete: () => console.log('Sign Up stream complete...')
      });
    }
  }
}
