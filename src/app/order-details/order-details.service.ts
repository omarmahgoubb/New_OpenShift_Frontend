import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'https://pythontest-omarmahgoub-dev.apps.rm3.7wse.p1.openshiftapps.com/order_details';  // Set the base URL of the backend

  constructor(private http: HttpClient) {}

  getOrderDetails(orderId: string, email: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(url, { headers, params: { email } });
  }
}
