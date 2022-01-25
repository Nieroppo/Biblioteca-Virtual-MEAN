import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../users/service/authUser.service'
import { HeaderService } from '../service/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {

  constructor(public authUserService: AuthUserService, public headerService: HeaderService) { }

  ngOnInit(): void {
    console.log(this.headerService.visible);
  }

}
