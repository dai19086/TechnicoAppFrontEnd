import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-repairs',
  standalone: true,
  imports: [],
  templateUrl: './user-repairs.component.html',
  styleUrl: './user-repairs.component.css'
})
export class UserRepairsComponent {

  @Input() currRepair: any;
  @Input() repairIndex!: number;

}
