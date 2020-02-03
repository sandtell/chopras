import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  logoutFn(){
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
