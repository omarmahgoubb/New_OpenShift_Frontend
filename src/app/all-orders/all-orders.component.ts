import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderResultModel } from '../models/OrderResultModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent {
  orders: OrderResultModel[] = [];
  status: string = '';
  deliveryAddress: string = '';
  productId: string = '';

  // Centralized API URL
  private API_URL: string = 'https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    const endpoint = `${this.API_URL}/manage_get_all`;
    this.http.get<any>(endpoint).subscribe({
      next: (data) => {
        this.orders = data.orders;
        console.log(this.orders);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  deleteOrder(orderId: string): void {
    const endpoint = `${this.API_URL}/manage_delete/${orderId}`;
    if (confirm('Are you sure you want to delete this order?')) {
      this.http.delete<any>(endpoint).subscribe({
        next: () => {
          this.getAllOrders();
        },
        error: (err) => {
          console.error('Error deleting order:', err);
        }
      });
    }
  }

  updateOrder() {
    const orderData = {
      order_id: this.productId,
      order_status: this.status,
      delivery_address: this.deliveryAddress,
    };

    const endpoint = `${this.API_URL}/manage_update`;
    this.http.put<any>(endpoint, orderData).subscribe({
      next: () => {
        this.getAllOrders();
      },
      error: (err) => {
        console.error('Error updating order:', err);
      }
    });
  }
}
