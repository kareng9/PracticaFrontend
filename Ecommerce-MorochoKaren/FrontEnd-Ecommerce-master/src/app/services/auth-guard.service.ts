import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService) { }
  canActivate() : boolean {
    if(!this.authService.isAuthenticaded()){
      return false;
    }
    return true;
  }
}
