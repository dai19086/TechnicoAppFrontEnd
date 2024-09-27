import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent  implements OnInit {

  loginForm!: FormGroup;
  userLoggedIn: any;
  logInButtonText = 'Log In';
  errorMessage: string = '';

  fb = inject(FormBuilder);
  private apiService = inject(UserService);

  minLen : number = 4;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLen), Validators.pattern("^[a-zA-Z0-9@]+$")]]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  loginUser() {
    this.logInButtonText = 'Logging In...';

    //if the form is valid and the necessary fields are filled
    if(this.email && this.password && this.loginForm.valid){
      //initiate log in attempt
      this.apiService.logIn(this.loginForm.value).subscribe({
        next: response => {
          this.userLoggedIn = response;
          //if (id=-1) it means something went wrong with the logging in at the server
          if(this.userLoggedIn.ownerId == -1){
              //the name should contain the error message
              this.errorMessage = this.userLoggedIn.name;
              //since it wasn't successful empty the user
              this.userLoggedIn = null;
          }else {
            //if everything's okay hide the error message
            this.errorMessage = '';
            //router
          }
        },
        error: err => console.error(`ERROR WHILE LOGGING IN... ${err}`),
        complete: () => console.log('Log in stream complete...')
      });
      this.logInButtonText = 'Log In';
    }
  }
}
