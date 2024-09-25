import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  receivedData : any;

  private apiService = inject(UserService)


  ngOnInit(): void {
    this.apiService.getUsers('http://localhost:8080/Technico/resources/owner/getAllOwners').subscribe({
      next: data => this.receivedData = data,
      error: err => console.log(err),
      complete: () => console.log('Stream complete...')
    })
      
  }


}
