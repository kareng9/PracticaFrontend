import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/constanst';
import { LoginI } from '../models/login.interface';
import { TokenDto } from '../models/tokenDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint:string= '';

  headers= new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router,
   @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
   }

   login(login:LoginI){
    this.http.post(`${this.endpoint}/api/Token`,login).subscribe(tokenDto=>{
      let tokenDtoResponse = tokenDto as TokenDto;
      //localStorage['setToken'](tokenDtoResponse.token);

      localStorage.setItem('token',tokenDtoResponse.token);
      this.router.navigate(['/home']);
    })
   }

   exit(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
   }

   isAuthenticaded(): boolean{
    let token = localStorage.getItem('token');
    if(token){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
   }

}
