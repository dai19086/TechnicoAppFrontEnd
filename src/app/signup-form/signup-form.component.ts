import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent implements OnInit{
  signUpForm!: FormGroup;

  fb = inject(FormBuilder)

  minLen : number = 4;

  signUpButtonText = 'Sign Up'

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      vat: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z\u0370-\u03FF]+$")]],
      surname: ['', [Validators.required, Validators.pattern("^[a-zA-Z\u0370-\u03FF]+$")]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLen), Validators.pattern("^[a-zA-Z0-9@]+$")]],
      typeOfUser: ['', [Validators.required]]
    });
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password')
  }

  signUpUser() {
    console.log(this.signUpForm.value);
    console.log(this.signUpForm.status);


    console.log(this.email)

    // add some logic for your data here
    // something like that
    // if (this.loginForm.valid)
    // this.service.post(this.loginForm.value)
  }
}
