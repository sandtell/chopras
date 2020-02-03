import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public domainURL = 'https://cors-anywhere.herokuapp.com/http://www.customergear.com/chopra/api/';


  constructor(private http: HttpClient) { }

  getData(url): Observable<any> {
    // console.log(this.http.get(url));
    return this.http.get(url);
  }

}
