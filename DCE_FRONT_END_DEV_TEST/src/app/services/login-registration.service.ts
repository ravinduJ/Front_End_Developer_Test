import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistrationService {

  constructor(private http: HttpClient) { }


  registerUser(details: any) { 
    
    let url = baseUrl + "/users";
    return this.http.post(url, details, {observe: 'response'});
  }

  login(Credentials: any) { 
    let url = baseUrl+ "/login";
    return this.http.post(url, Credentials, { observe: 'response' });

  }

}
