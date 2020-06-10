import { Component, OnInit } from '@angular/core';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.less']
})
export class LogsComponent implements OnInit {

  logs = [];

  constructor(private requestApi: RequestapiService) { }

  ngOnInit(): void {
  	this.requestApi.getLogs().subscribe((data: any[])=>{
  		this.logs = data;
  	})
  }
}
