import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header/service/header.service';
import { AuthUserService } from '../../users/service/authUser.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private headerService: HeaderService, private authUserService: AuthUserService, private router: Router ) { }

  ngOnInit(): void {
    this.headerService.show();
    if(this.authUserService.isLogged())  this.router.navigate(['/catalog']);

  }

}
