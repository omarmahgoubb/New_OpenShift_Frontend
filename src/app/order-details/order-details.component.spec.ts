import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsComponent } from './order-details.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsComponent, HttpClientTestingModule, FormsModule]  // Include HttpClientTestingModule to mock HTTP calls
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);  // Get HttpTestingController to mock API calls
    httpClient = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch order details when getOrderDetails is called', () => {
    const mockOrderDetails = {
      order_id: '12345',
      product_id: 'Volt',
      delivery_address: 'Faisal',
      order_status: 'Pending',
      created_at: '2024-11-08T17:46:12.575+00:00',
    };

    // Trigger the method
    component.orderId = '12345';  // Set a sample order ID
    component.getOrderDetails();  // Call the method to fetch order details

    const req = httpMock.expectOne('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/order_details/12345');  // Check that the correct API endpoint is called
    expect(req.request.method).toBe('GET');  // Expect GET request

    req.flush({ order_details: mockOrderDetails });  // Simulate the API response

    // Check if the component updated with the mock data
    expect(component.orderDetails).toEqual(mockOrderDetails);
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when order details cannot be fetched', () => {
    component.orderId = '12345';
    component.getOrderDetails();

    const req = httpMock.expectOne('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/order_details/12345');
    expect(req.request.method).toBe('GET');

    req.flush(
      { message: 'Order not found' },  // Simulate an error response
      { status: 404, statusText: 'Not Found' }
    );

    expect(component.orderDetails).toBeNull();
    expect(component.errorMessage).toBe('Order not found');
  });

  it('should cancel order successfully when cancelOrder is called', () => {
    const mockResponse = { message: 'Order status updated to "Canceled"' };

    // Set up mock order details
    component.orderDetails = {
      order_id: '12345',
      product_id: 'Volt',
      delivery_address: 'Faisal',
      order_status: 'Pending',
      created_at: '2024-11-08T17:46:12.575+00:00',
    };

    // Spy on console.log
    spyOn(console, 'log');

    // Call cancelOrder
    component.cancelOrder();

    const req = httpMock.expectOne('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/order_details/12345');
    expect(req.request.method).toBe('PATCH');  // Expect PATCH request

    req.flush(mockResponse);  // Simulate a successful cancel response

    expect(component.orderDetails.order_status).toBe('Canceled');
    expect(component.errorMessage).toBe('');
    expect(console.log).toHaveBeenCalledWith('Received response for cancel order:', mockResponse);
  });

  it('should handle error when canceling order fails', () => {
    component.orderDetails = {
      order_id: '12345',
      product_id: 'Volt',
      delivery_address: 'Faisal',
      order_status: 'Pending',
      created_at: '2024-11-08T17:46:12.575+00:00',
    };

    component.cancelOrder();

    const req = httpMock.expectOne('https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/order_details/12345');
    expect(req.request.method).toBe('PATCH');

    req.flush(
      { message: 'An error occurred while cancelling the order' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(component.errorMessage).toBe('An error occurred while cancelling the order');
  });

  afterEach(() => {
    httpMock.verify();  // Ensure no outstanding requests
  });
});
