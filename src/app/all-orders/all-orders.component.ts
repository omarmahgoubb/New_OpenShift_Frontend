import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderResultModel } from '../models/OrderResultModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  orders: OrderResultModel[] = [];
  status: string = '';
  deliveryAddress: string = '';
  productId: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    const endpoint = 'http://127.0.0.1:5000/manage_get_all';
    this.http.get<any>(endpoint).subscribe({
      next: (data) => {
        this.orders = data.orders;
        console.log(this.orders);
      },
    });
  }

  deleteOrder(orderId: string): void {
    const endpoint = `http://127.0.0.1:5000/manage_delete/${orderId}`;
    if (confirm('Are you sure you want to delete this order?')) {
      this.http.delete<any>(endpoint).subscribe({
        next: () => {
          this.getAllOrders();
        },
      });
    }
  }

  updateOrder() {
    const orderData = {
      order_id: this.productId,
      order_status: this.status,
      delivery_address: this.deliveryAddress,
    };

    this.http.put('http://127.0.0.1:5000/manage_update', orderData).subscribe({
      next: () => {},
    });

    this.getAllOrders();
  }
}
