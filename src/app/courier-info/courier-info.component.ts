import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courier-info',
  templateUrl: './courier-info.component.html',
  styleUrls: ['./courier-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Include FormsModule here
  ]
})
export class CourierInfoComponent {
  courierName: string = '';
  orders: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  getOrdersByCourier() {
    console.log("Fetching orders for courier:", this.courierName);
    const url = `http://127.0.0.1:5000/orders_by_courier/${this.courierName}`; // Use a route parameter

    this.http.get(url, { 
      headers: { 'Content-Type': 'application/json' },
    })
    .subscribe(
      (response: any) => {
        console.log("Received response:", response);
        this.orders = response.orders; 
        this.errorMessage = ''; 
      },
      (error) => {
        console.error("Error fetching orders:", error);
        this.errorMessage = error.error.message || 'An error occurred while fetching orders'; 
        this.orders = []; 
      }
    );
}

acceptOrder(orderId: string) {
  console.log("Accepting order ID:", orderId);
  const url = `http://127.0.0.1:5000/accept_order`;

  const body = {
    order_id: orderId,
    courier: this.courierName // Include the courier name in the request body
  };

  this.http.post(url, body, { 
    headers: { 'Content-Type': 'application/json' },
  })
  .subscribe(
    (response: any) => {
      console.log("Order accepted:", response);
      // Update the order status in the local list
      const order = this.orders.find(o => o.order_id === orderId);
      if (order) {
        order.order_status = 'Accepted by courier';
      }
      this.errorMessage = ''; 
    },
    (error) => {
      console.error("Error accepting order:", error);
      this.errorMessage = error.error.message || 'An error occurred while accepting the order'; 
    }
  );
}

rejectOrder(orderId: string) {
  console.log("Rejecting order ID:", orderId);
  const url = `http://127.0.0.1:5000/reject_order`;

  const body = {
    order_id: orderId,
    courier: this.courierName // Include the courier name in the request body
  };

  this.http.post(url, body, { 
    headers: { 'Content-Type': 'application/json' },
  })
  .subscribe(
    (response: any) => {
      console.log("Order rejected:", response);
      // Update the order status in the local list
      const order = this.orders.find(o => o.order_id === orderId);
      if (order) {
        order.order_status = 'order rejected by courier';
      }
      this.errorMessage = ''; 
    },
    (error) => {
      console.error("Error rejecting order:", error);
      this.errorMessage = error.error.message || 'An error occurred while rejecting the order'; 
    }
  );
}


}
