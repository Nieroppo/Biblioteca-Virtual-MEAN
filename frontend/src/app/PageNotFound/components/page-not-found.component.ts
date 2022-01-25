import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header/service/header.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  
})
export class PageNotFoundComponent implements OnInit {

  constructor( private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.hide();
    console.log(this.headerService.visible);
  }

}
