import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.css'],
  standalone: true,  // Mark as standalone
  imports: [CommonModule, FormsModule]  // Import FormsModule and CommonModule
})
export class AssignedOrdersComponent implements OnInit {
  orders: any[] = [];
  courierName: string = '';  // Input for dynamic search
  newCourierNames: { [key: string]: string } = {};  // Track new courier name per order
  errorMessage: string = '';  // Variable to store error message

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Fetch orders assigned to a specific courier by name
  fetchAssignedOrders(): void {
    if (!this.courierName.trim()) {
      alert('Please enter a courier name to search');
      return;
    }

    this.http.get<any[]>(`http://localhost:5000/assigned-to-courier?courier=${this.courierName}`)
      .subscribe(
        data => {
          this.orders = data;
          this.errorMessage = '';  // Clear any previous error messages
        },
        error => {
          console.error('Error fetching assigned orders', error);
          if (error.status === 403) {
            this.errorMessage = 'You are not allowed to use this functionality.';  // Handle 403 error
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';  // General error message
          }
        }
      );
  }

  // Reassign an order to a new courier
  reassignOrder(orderId: string): void {
    const newCourierName = this.newCourierNames[orderId];
    if (!newCourierName || !newCourierName.trim()) {
      alert('Please enter a new courier name for reassignment');
      return;
    }

    const requestBody = {
      order_id: orderId,
      courier: newCourierName
    };

    this.http.put(`http://localhost:5000/reassign`, requestBody)
      .subscribe(
        response => {
          alert('Order reassigned successfully');
          this.fetchAssignedOrders();  // Refresh the order list after reassignment
        },
        error => {
          console.error('Error reassigning order', error);
          alert('An error occurred while reassigning the order.');
        }
      );
  }
}
