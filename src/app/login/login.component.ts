import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, HttpClientModule] ,
})
export class LoginComponent {
  message: string = ''; 
  isError: boolean = false;
  constructor(private http: HttpClient) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.http.post('http://127.0.0.1:5000/login', { email, password }).subscribe(
        response => {
          this.isError = false;
          this.message = 'User Logged in successfully';
        },
        error => {
          this.isError = true;
          this.message = error.error.message || 'Login failed';
        }
      );
    }
  }
}
