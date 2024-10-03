import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-repair',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './create-repair.component.html',
  styleUrl: './create-repair.component.css'
})
export class CreateRepairComponent implements OnInit {
  //field to retrieve the property for which the repair will be
  propertyToRepair: any = {};
  //fields for form
  repairCreation!: FormGroup;
  errorMessage: string = '';
  subDate: Date = new Date();
  repairTypes: string[] = ['PAINTING', 'INSULATION', 'FRAMES', 'PLUMPING', 'ELECTRICAL_WORK'];
  //inject services
  private fb = inject(FormBuilder)
  private apiService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    //get the propertyToRepair from the  query parameters
    this.route.queryParams.subscribe({
      next: params => {
        if (params['propertyToRepair']){
          this.propertyToRepair = JSON.parse(params['propertyToRepair'])
        }
      },
      error: err => console.error(`ERROR WHILE RETRIEVING QUERY PARAMS... ${err}`),
        complete: () => console.log('Query Params stream complete...') 
    })
    //initialize form
    this.repairCreation = this.fb.group({
      property: [this.propertyToRepair],
      typeOfRepair: ['', [Validators.required, Validators.pattern("^[A-Z_]+$")]],
      shortDescription: ['', [Validators.required]],
      workDescription: ['', [Validators.required]],
      submissionDate: [`${this.subDate.getFullYear()}-${this.subDate.getMonth() + 1}-${this.subDate.getDate()}`],
      proposedStartDate: ['', [Validators.required]],
      proposedEndDate: ['', [Validators.required]],
      proposedCost: ['', [Validators.required, Validators.pattern("^[0-9.,]+$")]],
      ownerAcceptance: [false],
      status: ['PENDING']
    });
  }

  get typeOfRepair() {
    return this.repairCreation.get('typeOfRepair');
  }

  get shortDescription() {
    return this.repairCreation.get('shortDescription');
  }

  get workDescription() {
    return this.repairCreation.get('workDescription');
  }

  get proposedStartDate() {
    return this.repairCreation.get('proposedStartDate');
  }

  get proposedEndDate() {
    return this.repairCreation.get('proposedEndDate');
  }

  get proposedCost() {
    return this.repairCreation.get('proposedCost');
  }

  /**
   * Method for Repair Creation Form
   * When the Propose Repair button is clicked, if the form is valid,
   * Call the apiService to save the Property Repair that was created.
   * If response = -1 it means that the repair could not be saved
   *  let the user know through the error message
   * Otherwise the repair was saved successfully
   *  Clear the error message and redirect back to the User Page.
   * If the back end threw an error write it in the console.
   */
  addRepair() {
    if (this.repairCreation.valid) {
      this.apiService.saveRepair(this.repairCreation.value).subscribe({
        next: (response: any) => {
          if (response == -1) {
            this.errorMessage = 'Repair save failed...';
          } else {
            this.errorMessage = '';
            this.router.navigate(['home'])
          }
        },
        error: err => console.error(`ERROR WHILE SAVING REPAIR... ${err}`),
        complete: () => console.log('Repair Save stream complete...')
      });
    }
  }

}
