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
  signUpForm!: FormGroup;
  errorMessage: string = '';
  signUpButtonText = 'Sign Up'
  types: string[] = ['OWNER', 'ADMIN'];

  fb = inject(FormBuilder)
  private apiService = inject(UserService);
  router = inject(Router);

  minLen: number = 4;


  ngOnInit(): void {
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

  signUpUser() {
    this.signUpButtonText = 'Signing Up...';

    if (this.signUpForm.valid) {
      this.apiService.signUpUser(this.signUpForm.value).subscribe({
        next: (response : any) => {
          if (response.value === -1) {
            this.errorMessage = 'Sign Up failed...';
            
          }else{
            this.errorMessage = response.value;
            this.router.navigate(['login']);
          }
        },
        error: err => console.error(`ERROR WHILE SIGNING UP... ${err}`),
        complete: () => console.log('Sign Up stream complete...')
      });
    }
  }
}
