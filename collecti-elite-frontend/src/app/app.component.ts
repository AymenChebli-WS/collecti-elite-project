import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'collecti-elite-frontend';
  isLoginPage!: boolean;
  isRegisterPage!: boolean;

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isRegisterPage = this.router.url === '/register';
      }
    });
  }

  logout(): void {
    this.userService.logoutUser();
    // Add any other logout-related logic, e.g., redirect to login page
    this.router.navigate(['/login']);
  }

  toggleDrawer() {
    this.drawer.toggle(); // Now the 'drawer' reference is accessible and can be used to toggle the drawer
  }
}
