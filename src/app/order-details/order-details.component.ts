import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class OrderDetailsComponent {
  orderId: string = '';
  orderDetails: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  getOrderDetails() {
    console.log("Fetching order details for Order ID:", this.orderId);
    const url = `http://127.0.0.1:5000/order_details/${this.orderId}`; // Full URL for debugging
    
    this.http.get(url, { 
      headers: { 'Content-Type': 'application/json' }, 
    })
    .subscribe(
      (response: any) => {
        console.log("Received response:", response);
        this.orderDetails = response.order_details; 
        this.errorMessage = '';
      },
      (error) => {
        console.error("Error fetching order details:", error);
        this.errorMessage = error.error.message || 'An error occurred while fetching order details'; 
        this.orderDetails = null; 
      }
    );
  }

  cancelOrder() {
    // Ensure the order status is 'Pending' before attempting to cancel
    if (this.orderDetails?.order_status !== 'Pending') {
      this.errorMessage = 'You can only cancel orders with status "Pending".';
      return;
    }

    console.log("Cancelling order with Order ID:", this.orderId);
    const url = `http://127.0.0.1:5000/order_details/${this.orderId}`;
    const body = { /* Add logic to fetch logged-in user’s email from the backend or session */ };

    this.http.patch(url, body, { 
      headers: { 'Content-Type': 'application/json' }, 
    })
    .subscribe(
      (response: any) => {
        console.log("Received response for cancel order:", response);
        this.orderDetails.order_status = 'Canceled'; // Update the order status in the frontend
        this.errorMessage = ''; // Clear any previous error message
        alert(response.message); // Optionally alert the user with the success message
      },
      (error) => {
        console.error("Error cancelling order:", error);
        this.errorMessage = error.error.message || 'An error occurred while cancelling the order'; 
      }
    );
  }
}
