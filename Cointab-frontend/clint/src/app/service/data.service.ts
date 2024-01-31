import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  private _email!: string;
  URL:string = 'http://localhost:3000/login';

  login(email:string, password:string){
    return this.http.post(this.URL,{email,password});
  }


  getHome(email: string) {
    return this.http.get(`${this.URL}=${email}`);
  }
  getEmail(): string {
    return this._email; // <-- retrieve email
  }
  logout(email: string) {
    return this.http.get(`${this.URL}=${email}`);
  }
}
