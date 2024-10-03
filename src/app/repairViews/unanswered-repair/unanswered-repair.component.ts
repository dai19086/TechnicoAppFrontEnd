import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-unanswered-repair',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './unanswered-repair.component.html',
  styleUrl: './unanswered-repair.component.css'
})
export class UnansweredRepairComponent {
  //Inputs from owner component (parent)
  @Input() currRepair: any; //the repair to display
  @Input() repairIndex!: number;  //the index of the repair in the unanswered repairs list

  //Output event that will contain the index of the answered repair in the unanswered repairs list
  @Output() answer: EventEmitter<number> = new EventEmitter<number>();

  //inject API service
  private apiService = inject(UserService);

  errorMessage : string = ''; //initialize error message

  /**
   * Method of the ACCEPT and DECLINE buttons
   * Modifies the repair  according to the user's answer
   * and calls the apiService to save the changes to the modified repair.
   * If it couldn't save the repair shows error message.
   * If the repair was saved successfully empty the error message and
   *  emit the output event for the parent (owner) to  handle.
   * If an error occured in the back end and an exception was thrown write it in the console.
   * @param ans String that specifies which button called the method
   * ('ACCEPT') accepts the  repair, anything else rejects it.
   */
  getAnswer(ans: string) {
    if (ans == 'ACCEPT') {
      this.currRepair.ownerAcceptance = true;
      this.currRepair.status = 'IN_PROGRESS';
      this.currRepair.actualStartDate = this.currRepair.proposedStartDate;
      this.currRepair.actualEndDate = this.currRepair.proposedEndDate;
    } else {
      this.currRepair.ownerAcceptance = true;
      this.currRepair.status = 'DECLINED';
      this.currRepair.actualStartDate = null;
      this.currRepair.actualEndDate = null;
    }

    this.apiService.saveRepair(this.currRepair).subscribe({
      next: (response : any) => {
        if (response == -1) {
          this.errorMessage = 'Repair answer failed...';
        }else{
          this.errorMessage = '';
          this.answer.emit(this.repairIndex);
        }
      },
      error: err => console.error(`ERROR WHILE ANSWERING REPAIR... ${err}`),
      complete: () => console.log('Repair Answer stream complete...')
    });
  }
}
