import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuOpen: boolean = false;
  showUserDetails: boolean = false;
  showLanguageMenu = false;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.showLanguageMenu = false;
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUserDetails() {
    this.showUserDetails = !this.showUserDetails;
  }
}
