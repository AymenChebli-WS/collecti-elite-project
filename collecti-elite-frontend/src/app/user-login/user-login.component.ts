import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')!.hasError('required')) {
        this.showSnackbar('Email is required');
      } else if (this.loginForm.get('email')!.hasError('email')) {
        this.showSnackbar('Invalid email format');
      } else if (this.loginForm.get('password')!.hasError('required')) {
        this.showSnackbar('Password is required');
      } else if (this.loginForm.get('password')!.hasError('minlength')) {
        this.showSnackbar('Password should be at least 6 characters long');
      }
      return;
    }

    const formData = this.loginForm.value;
    this.userService.loginUser(formData).subscribe(
      (response) => {
        this.router.navigate(['/survey/list']);
        this.showSnackbar('Welcome to Collecti!');
      },
      (error) => {
        console.log(error.error.error);
        this.showSnackbar(error.error.error);
      }
    );
  }

  private showSnackbar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }
}
