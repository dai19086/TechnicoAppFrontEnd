import { Component, inject, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';
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
  private userData = inject(UserDataService);
  private apiService = inject(UserService);
  router = inject(Router);

  unansweredRepairsList: any;
  currUnanRepair : number = 0;
  ownerPropertyRepairsList: any;
  currUserRepair : number = 0;

  propertyScreenVisible: boolean = false;
  unansweredRepairsVisible: boolean = false;
  userRepairsVisible: boolean = false;

  ngOnInit(): void {
    this.userLoggedIn = this.userData.getData('userLoggedIn');
    this.apiService.getUserUnansweredRepairs(this.userLoggedIn.vatNumber).subscribe({
      next: response => this.unansweredRepairsList = response,
      error: err => console.log('ERROR!!! Repairs not found!!!' + err),
      complete: () => console.log('Unanswered repairs stream complete')
    });
    this.apiService.getUserRepairs(this.userLoggedIn.vatNumber).subscribe({
      next: response => this.ownerPropertyRepairsList = response,
      error: err => console.log('ERROR!!! Repairs not found!!!' + err),
      complete: () => console.log('User repairs stream complete')
    });
  }

  showPropertyScreen() {
    if (this.propertyScreenVisible) {
      this.propertyScreenVisible = false;
    } else {
      this.propertyScreenVisible = true;
      this.unansweredRepairsVisible = false;
      this.userRepairsVisible = false;
    }
  }

  showUnansweredRepairs() {
    if (this.unansweredRepairsVisible) {
      this.unansweredRepairsVisible = false;
    } else {
      this.unansweredRepairsVisible = true;
      this.userRepairsVisible = false;
      this.propertyScreenVisible = false;
    }
  }

  showAllUserRepairs() {
    if (this.userRepairsVisible) {
      this.userRepairsVisible = false;
    } else {
      this.userRepairsVisible = true;
      this.propertyScreenVisible = false;
      this.unansweredRepairsVisible = false;
    }
  }

  next(choice : string){
    if (choice == 'Unanswered') this.currUnanRepair++;
    else this.currUserRepair++;
  }

  prev(choice : string){
    if (choice == 'Unanswered') this.currUnanRepair--;
    else this.currUserRepair--;
  }

  getAnswer(event: number){
    //remove the answered repair
    this.unansweredRepairsList.splice(event,1);
    //if it's not the first  element that you removed go to the previous  one
    if (this.currUnanRepair > 0) this.prev('Unanswered');
  }
}
