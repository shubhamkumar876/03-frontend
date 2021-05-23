import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'https://bestdealshop.herokuapp.com/api/checkout/purchase';

  public fName: string = "";
  public lName: string = "";
  public pEmail: string = "";
  public isAuthenticated: boolean = false;

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {

    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }
}
