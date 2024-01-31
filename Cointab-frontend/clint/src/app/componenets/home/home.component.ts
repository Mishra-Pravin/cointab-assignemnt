import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  email!: string;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state as {email: string}; // <-- add type assertion here

    if (state && state.email) {
      this.email = state.email; // <-- get email from state parameters
    }
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
