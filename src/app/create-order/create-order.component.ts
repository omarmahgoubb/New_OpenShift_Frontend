import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  standalone: true,  // Add this line
  imports: [FormsModule],  // Import FormsModule here
})
export class CreateOrderComponent {
  product_id: string = '';
  delivery_address: string = '';
  pickup_location: string = '';
  dropoff_location: string = '';
  package_details: string = '';
  delivery_time: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  createOrder() {
    const orderData = {
      product_id: this.product_id,
      delivery_address: this.delivery_address,
      pickup_location: this.pickup_location,
      dropoff_location: this.dropoff_location,
      package_details: this.package_details,
      delivery_time: this.delivery_time
    };

    this.http.post('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/create_order', orderData)
      .subscribe(
        (response: any) => {
          console.log(response);
          alert(response.message);
          this.router.navigate(['/my-orders']); // Redirect after successful order creation
        },
        (error) => {
          console.error(error);
          alert(error.error.message);
        }
      );
  }
}
