import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

// Import the necessary components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';  // Import OrderDetailsComponent
import { CourierInfoComponent } from './courier-info/courier-info.component'; // Import the CourierInfoComponent
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';  // Import UpdateOrderStatusComponent
import { AllOrdersComponent } from './all-orders/all-orders.component'; // Import AllOrdersComponent
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component'; // Import AssignedOrdersComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    CreateOrderComponent,
    MyOrdersComponent,
    OrderDetailsComponent, 
    CourierInfoComponent,
    UpdateOrderStatusComponent, // Add UpdateOrderStatusComponent here
    AllOrdersComponent, // Add AllOrdersComponent
    AssignedOrdersComponent  // Add AssignedOrdersComponent here
  ],
})
export class AppComponent {
  // Update the selectedForm type to include 'assigned-orders' as well
  selectedForm: 
    | 'login' 
    | 'register' 
    | 'create-order' 
    | 'my-orders' 
    | 'order-details' 
    | 'courier-info' 
    | 'update-order-status' 
    | 'all-orders' 
    | 'assigned-orders' = 'login';  // Add 'assigned-orders' type

  // Implement the method to check if the user is an admin
  isAdmin(): boolean {
    // Implement your actual admin checking logic here (e.g., checking user role)
    return true; // For now, assuming the user is an admin for demonstration
  }

  // Update the showForm method to accept 'assigned-orders'
  showForm(formType: 
    | 'login' 
    | 'register' 
    | 'create-order' 
    | 'my-orders' 
    | 'order-details' 
    | 'courier-info' 
    | 'update-order-status' 
    | 'all-orders'
    | 'assigned-orders') { 
    this.selectedForm = formType;
  }
}
