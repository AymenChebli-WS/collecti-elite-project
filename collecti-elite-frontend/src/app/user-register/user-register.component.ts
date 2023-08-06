import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      birthday: ['', Validators.required]
    });

   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.userService.registerUser(formData).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.showSnackbar('Your account has been created!');
        },
        (error) => {
          this.showSnackbar('Error, please try again');
        }
      );
    } else {
      if (this.registrationForm.get('nom')?.invalid) {
        this.showSnackbar('Please enter your name');
      }
  
      if (this.registrationForm.get('prenom')?.invalid) {
        this.showSnackbar('Please enter your last name');
      }
  
      if (this.registrationForm.get('email')?.invalid) {
        if (this.registrationForm.get('email')?.errors?.['required']) {
          this.showSnackbar('Please enter your email');
        } else {
          this.showSnackbar('Please enter a valid email address');
        }
      }
  
      if (this.registrationForm.get('password')?.invalid) {
        if (this.registrationForm.get('password')?.errors?.['required']) {
          this.showSnackbar('Please enter your password');
        } else {
          this.showSnackbar('Password must be at least 6 characters long');
        }
      }
  
      if (this.registrationForm.get('address')?.invalid) {
        this.showSnackbar('Please enter your address');
      }
  
      if (this.registrationForm.get('birthday')?.invalid) {
        this.showSnackbar('Please enter your birthday');
      }
    }
  
  }

  private showSnackbar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }
}
