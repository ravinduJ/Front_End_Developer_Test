import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private http: HttpClient) { }
  
  UpdateUser(userId: any, updatedData: any) {
    let url = baseUrl + '/users/' + userId;
    return this.http.put(url, updatedData, { observe: 'response' });
  }


}
