import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  constructor(
    private platform: Platform,
    private storage: Storage,
    private router: Router,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

   ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login() {
    let dummyResponse = {
      user_id: '000',
    };
    this.storage.set('USER_INFO', dummyResponse).then((response) => {
      this.router.navigateByUrl('home');
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigateByUrl('login');
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
