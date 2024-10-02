import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-repairs',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-repairs.component.html',
  styleUrl: './user-repairs.component.css'
})
export class UserRepairsComponent {

  @Input() currRepair: any;
  @Input() repairIndex!: number;

}
