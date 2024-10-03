import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent  implements OnInit {
  //fields for Log In
  loginForm!: FormGroup;
  userLoggedIn: any;
  logInButtonText = 'Log In';
  errorMessage: string = '';
  //inject services
  private fb = inject(FormBuilder);
  private apiService = inject(UserService);
  private router = inject(Router);
  private userData = inject(UserDataService);

  minLen : number = 4;  //password minimum length

  ngOnInit(): void {
    //initialize the log in form
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

  /**
   * Method for Log In Form.
   * When the Log In Button is click, change the button's text to signal that the log in attempt is underway.
   * If all the fields are filled  and valid,
   * Initiate log in attempt by calling the apiService method.
   * If everything's okay hide the error message.
   *  Load the service userData with the information of the logged in user.
   *  Redirect to the home (User) page.
   * If (id=-1) it means something went wrong with finding the given values in at the server.
   *  the returned user name should contain the error message. And since it wasn't successful empty the user.
   * If another error was thrown by the server write it in the console.
   * Reset the login button's text.
   */
  loginUser() {
    this.logInButtonText = 'Logging In...';

    if(this.email && this.password && this.loginForm.valid){
      
      this.apiService.logIn(this.loginForm.value).subscribe({
        next: response => {
          this.userLoggedIn = response;
          
          if(this.userLoggedIn.ownerId == -1){
              this.errorMessage = this.userLoggedIn.name;
              this.userLoggedIn = null;
          }else {
            
            this.errorMessage = '';
            this.userData.setData('userLoggedIn', this.userLoggedIn);
            this.router.navigate(['home']);
          }
        },
        error: err => console.error(`ERROR WHILE LOGGING IN... ${err}`),
        complete: () => console.log('Log in stream complete...')
      });
      this.logInButtonText = 'Log In';
    }
  }
}
