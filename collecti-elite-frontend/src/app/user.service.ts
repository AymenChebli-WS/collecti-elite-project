import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }
  //===============================  Get All users  =================================
  private getAllUsersUrl = 'http://127.0.0.1:8000/userlist';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersUrl);
  }

  //===============================  Register  =================================
  private registerUrl = 'http://127.0.0.1:8000/usernew';
  
  registerUser(formData: any): Observable<User> {
    formData.birthday = this.formatDate(formData.birthday);
    const params = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      params.set(key, formData[key]);
    });

    return this.http.post<User>(`${this.registerUrl}?${params.toString()}`, {});
  }

  private formatDate(date: any): string {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  //===============================  Login  =================================
  private loginUrl = 'http://127.0.0.1:8000/userlogin';
  
  loginUser(formData: any): Observable<User> {
    const params = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      params.set(key, formData[key]);
    });

    return this.http.post<User>(`${this.loginUrl}?${params.toString()}`, {}).pipe(
      tap((response) => {
        // Save user information to localStorage
        localStorage.setItem('userId', response.userId.toString());
        // Add any other user-related data that you need
      })
    );
  }

  //===============================  Logout  =================================
  logoutUser(): void {
    // Clear user information from localStorage
    localStorage.removeItem('userId');
    // Add any other user-related data that you need to clear
  }

  //===============================  Login Checker  =================================
  isLoggedIn(): boolean {
    // Check if the user information is present in localStorage
    return !!localStorage.getItem('userId');
  }

  //===============================  Logged in user info  =================================
  private userInfoUrl = 'http://127.0.0.1:8000/userinfo';

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.userInfoUrl}/${userId}`);
  }
}
