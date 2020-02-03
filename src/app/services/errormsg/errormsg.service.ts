import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrormsgService {

  constructor() { }

  validation_messages = {
    fullName: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Number are not allowed' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    mobileNo: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
  };

}
