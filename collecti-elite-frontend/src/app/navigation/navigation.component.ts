import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private userService: UserService, private router: Router) {}

  logout(): void {
    this.userService.logoutUser();
    // Add any other logout-related logic, e.g., redirect to login page
    this.router.navigate(['/login']);
  }
}
