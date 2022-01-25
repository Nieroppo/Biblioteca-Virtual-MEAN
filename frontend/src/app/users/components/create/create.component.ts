import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CreateUserService } from '../../service/createUser.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header/service/header.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CreateUserService]
})
export class CreateComponent implements OnInit {
  public titleOfPage: string;
  public user: User;

  constructor( private _createUserService: CreateUserService, private _router: Router , private headerService: HeaderService) { 
    this.titleOfPage = 'Create a new account';
    this.user = new User("","","","");
  }

  ngOnInit(): void {
    this.headerService.show();
  }
  onSubmit(form : any){
    this._createUserService.create(this.user).subscribe(
      response=>{
        console.log({result: true});
        localStorage.setItem('token', response.token);
        this._router.navigate(['/catalog']);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
