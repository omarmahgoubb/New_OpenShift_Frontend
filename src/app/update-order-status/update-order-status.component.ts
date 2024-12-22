import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Import the modules here
})
export class UpdateOrderStatusComponent {
  order_id: string = '';
  new_status: string = '';
  validStatuses = ['picked up', 'in transit', 'delivered'];

  constructor(private http: HttpClient) {}

  updateOrderStatus() {
    const orderData = {
      order_id: this.order_id,
      new_status: this.new_status,
    };

    this.http.post('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/update_order_status', orderData)
      .subscribe(
        (response: any) => {
          console.log(response);
          alert(response.message);
        },
        (error) => {
          console.error(error);
          alert(error.error.message);
        }
      );
  }
}
