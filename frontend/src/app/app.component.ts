import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter , map} from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Biblioteca';
 url : string;
  constructor(private router: Router){
    this.url =""
  }
  

  ngOnInit(): void {
  this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map((e: NavigationEnd) => this.url = e.urlAfterRedirects)
  ).subscribe();
  
}
}

