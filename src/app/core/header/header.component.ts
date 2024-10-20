import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuOpen: boolean = false;
  showUserDetails: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Toggles the user details dropdown
  toggleUserDetails() {
    this.showUserDetails = !this.showUserDetails;
  }
}
