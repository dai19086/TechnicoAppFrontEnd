import { Component, inject, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { UserService } from '../service/user.service';
import { JsonPipe } from '@angular/common';
import { CreatePropertyComponent } from "../create-property/create-property.component";
import { UnansweredRepairComponent } from "../repairViews/unanswered-repair/unanswered-repair.component";
import { UserRepairsComponent } from "../repairViews/user-repairs/user-repairs.component";

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [JsonPipe, CreatePropertyComponent, UnansweredRepairComponent, UserRepairsComponent],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit {

  userLoggedIn: any;
  //inject needed services
  private userData = inject(UserDataService);
  private apiService = inject(UserService);

  //lists and page modifiers for repair views
  unansweredRepairsList: any;
  currUnanRepair : number = 0;
  ownerPropertyRepairsList: any;
  currUserRepair : number = 0;

  //visibility flags for the owner views
  propertyScreenVisible: boolean = false;
  unansweredRepairsVisible: boolean = false;
  userRepairsVisible: boolean = false;

  ngOnInit(): void {
    //retrieve userLoggedIn to get repairs
    this.userLoggedIn = this.userData.getData('userLoggedIn');
    //Call the API to retrieve the repairs that correspond to this user's VAT Number
      //Get the unanswered repairs
    this.apiService.getUserUnansweredRepairs(this.userLoggedIn.vatNumber).subscribe({
      next: response => this.unansweredRepairsList = response,
      error: err => console.log('ERROR!!! Repairs not found!!!' + err),
      complete: () => console.log('Unanswered repairs stream complete')
    });
      //Get all the user's repairs
    this.apiService.getUserRepairs(this.userLoggedIn.vatNumber).subscribe({
      next: response => this.ownerPropertyRepairsList = response,
      error: err => console.log('ERROR!!! Repairs not found!!!' + err),
      complete: () => console.log('User repairs stream complete')
    });
  }

  /**
   * Method for Add Property button.
   * Manipulates the flags for the owner's views
   * to show only the Property Creation form.
   */
  showPropertyScreen() {
    if (this.propertyScreenVisible) {
      this.propertyScreenVisible = false;
    } else {
      this.propertyScreenVisible = true;
      this.unansweredRepairsVisible = false;
      this.userRepairsVisible = false;
    }
  }

  /**
   * Method for Unanswered Repairs button.
   * Manipulates the flags for the owner's views
   * to show only the Unanswered Repairs display.
   */
  showUnansweredRepairs() {
    if (this.unansweredRepairsVisible) {
      this.unansweredRepairsVisible = false;
    } else {
      this.unansweredRepairsVisible = true;
      this.userRepairsVisible = false;
      this.propertyScreenVisible = false;
    }
  }

  /**
   * Method for My Repairs button.
   * Manipulates the flags for the owner's views
   * to show only the Owner's Full Repairs display.
   */
  showAllUserRepairs() {
    if (this.userRepairsVisible) {
      this.userRepairsVisible = false;
    } else {
      this.userRepairsVisible = true;
      this.propertyScreenVisible = false;
      this.unansweredRepairsVisible = false;
    }
  }

  /**
   * Method for Next buttons.
   * Increases the page modifiers of the chosen list of repairs
   * @param choice String that specifies from which view the method is called
   */
  next(choice : string){
    if (choice == 'Unanswered') this.currUnanRepair++;
    else this.currUserRepair++;
  }

  /**
   * Method for Previous buttons.
   * Decreases the page modifiers of the chosen list of repairs
   * @param choice String that specifies from which view the method is called
   */
  prev(choice : string){
    if (choice == 'Unanswered') this.currUnanRepair--;
    else this.currUserRepair--;
  }

  /**
   * Listener for unanswered-repair components event
   * Activates when an unanswered repair is answered.
   * Remove the answered repair from the unanswered list
   * and if it's not the first element that was answered
   * go to the previous one.
   * @param event 
   */
  getAnswer(event: number){
    this.unansweredRepairsList.splice(event,1);
    if (this.currUnanRepair > 0) this.prev('Unanswered');
  }
}
