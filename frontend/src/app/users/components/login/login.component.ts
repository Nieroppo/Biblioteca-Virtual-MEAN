import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthUserService } from '../../service/authUser.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header/service/header.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  public titleOfPage: string;
  public user: User;
  constructor( private _authUserService: AuthUserService, private _router: Router, private headerService: HeaderService) {
    this.titleOfPage ='Login';
    this.user = new User("","","","");
   }

  ngOnInit(): void {
    this.headerService.show();
  }

  onSubmit(form : any){
    this._authUserService.login(this.user).subscribe(
      response=>{
       
        localStorage.setItem('token', response.token);
        this._router.navigate(['/catalog']);

      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
