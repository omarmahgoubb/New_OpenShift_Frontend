import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  standalone: true,  // This allows the component to work without being part of a module
  imports: [FormsModule, CommonModule],  // Import CommonModule in addition to FormsModule
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];  // Initialize an empty array to hold orders

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMyOrders();  // Fetch orders when the component initializes
  }

  fetchMyOrders() {
    this.http.get<any>('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/my_orders')  // Updated backend URL
      .subscribe(
        (response) => {
          this.orders = response.orders;  // Ensure the response structure matches your backend
        },
        (error) => {
          console.error(error);  // Log error for debugging
          alert(error.error?.message || 'An error occurred while fetching orders.');  // Handle errors gracefully
        }
      );
  }
}
