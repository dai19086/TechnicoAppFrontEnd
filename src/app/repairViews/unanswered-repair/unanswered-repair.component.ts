import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-unanswered-repair',
  standalone: true,
  imports: [],
  templateUrl: './unanswered-repair.component.html',
  styleUrl: './unanswered-repair.component.css'
})
export class UnansweredRepairComponent {
  @Input() currRepair: any;
  @Input() repairIndex!: number;

  @Output() answer: EventEmitter<number> = new EventEmitter<number>();

  private apiService = inject(UserService);

  errorMessage : string = '';

  getAnswer(ans: string) {
    if (ans == 'ACCEPT') {
      this.currRepair.ownerAcceptance = true;
      this.currRepair.status = 'IN_PROGRESS';
      this.currRepair.actualStartDate = this.currRepair.proposedStartDate;
      this.currRepair.actualEndDate = this.currRepair.proposedEndDate;
    } else {
      this.currRepair.ownerAcceptance = false;
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
