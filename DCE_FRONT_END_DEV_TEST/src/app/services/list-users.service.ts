import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(private http: HttpClient) { }


  getUserList(page: any, pagesize: any) { 

    let url = baseUrl+"/users?page=" + page+ "&per_page=" + pagesize;
    return this.http.get(url);
  }

  deleteUser(userid: any) { 
    let url = baseUrl + "/users/" + userid;
    return this.http.delete(url, {observe: 'response'});
  }

}
