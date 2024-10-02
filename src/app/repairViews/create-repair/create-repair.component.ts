import { Component, inject, Input, OnInit } from '@angular/core';
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
  propertyToRepair: any = {};

  repairCreation!: FormGroup;
  fb = inject(FormBuilder)
  private apiService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  errorMessage: string = '';
  subDate: Date = new Date();
  repairTypes: string[] = ['PAINTING', 'INSULATION', 'FRAMES', 'PLUMPING', 'ELECTRICAL_WORK'];

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        if (params['propertyToRepair']){
          this.propertyToRepair = JSON.parse(params['propertyToRepair'])
        }
      },
      error: err => console.error(`ERROR WHILE RETRIEVING QUERY PARAMS... ${err}`),
        complete: () => console.log('Query Params stream complete...') 
    })

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
