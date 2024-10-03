import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  //inject router service
  private router = inject(Router);

  /**
   * Method for Log In button.
   * Redirects the user to the Log In Page.
   */
  goLogIn(){
    this.router.navigate(['login'])
  }

  /**
   * Method for Sign Up button.
   * Redirects the user to the Sign Up Page.
   */
  goSignUp(){
    this.router.navigate(['signup'])
  }

}
