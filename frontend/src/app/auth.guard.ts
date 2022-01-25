import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthUserService } from './users/service/authUser.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authUserService: AuthUserService,
    private router: Router
    ){

  }
  canActivate(){
    if(this.authUserService.isLogged()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
    
  
  
}
