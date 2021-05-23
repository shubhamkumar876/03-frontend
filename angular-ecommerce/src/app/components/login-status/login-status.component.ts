import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName!: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService,
              private checkoutService: CheckoutService) {}

  ngOnInit(): void {

    //subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe (
      (result) => {
        this.isAuthenticated = result;
        this.checkoutService.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
    
    if (this.isAuthenticated) {

      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name!;
          this.checkoutService.fName = res.given_name!;
          this.checkoutService.lName = res.family_name!;
          this.checkoutService.pEmail = res.email!;
          //retrieve the user's email from authentication response
          const theEmail = res.email;
          
          // store the email in the session storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      );
    }
  }

  logout() {

    // Terminates the session with okta and removes current tokens
    this.oktaAuthService.signOut();
  }

}
