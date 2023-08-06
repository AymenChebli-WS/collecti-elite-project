import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  userId!: number | null;
  birthDate!: any;
  

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Get the userId from localStorage when the component is initialized
    this.userId = Number(localStorage.getItem('userId'));
    // Fetch the user information
    this.getUserInfo();
  }

  getUserInfo() {
    // Check if userId is available before making the API call
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          this.user = user;
          const dateOnly = user.birthday.split('T')[0];
          this.birthDate = dateOnly;
        },
        (error) => {
          console.log('Error fetching user information', error);
        }
      );
    }
  }
}
