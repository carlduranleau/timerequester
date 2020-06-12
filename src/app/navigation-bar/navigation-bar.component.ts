import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less']
})
export class NavigationBarComponent implements OnInit {

  constructor(private requestApi: RequestapiService) { }

  ngOnInit(): void {
  }

  public routeTo(url) {
  	this.requestApi.navigate([url]);
  }

  public logout() {
  	this.requestApi.logout();
  }
}
