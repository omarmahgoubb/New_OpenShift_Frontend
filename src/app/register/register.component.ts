import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, HttpClientModule] ,
})
export class RegisterComponent {
  message: string = ''; 
  isError: boolean = false;

  constructor(private http: HttpClient) {}

  onRegister(form: NgForm) {
    if (form.valid) {
      const { name, email, phone, password, role } = form.value;  // include role
      this.http.post('http://127.0.0.1:5000/register', { name, email, phone, password, role }).subscribe(
        response => {
          this.isError = false;
          this.message = 'User registered successfully';
        },
        error => {
          this.isError = true;
          this.message = error.error.message || 'Registration failed';
        }
      );
    }
  }
}
