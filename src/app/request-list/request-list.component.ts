import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.less']
})
export class RequestListComponent implements OnInit {

  requests = [];

  constructor(private router:Router, private requestApi: RequestapiService) { }

  ngOnInit(): void {
  	this.requestApi.getRequests().subscribe((data: any[])=>{
  		this.requests = data;
  	})
  }

  requestDetails(id): void {
  	this.requestApi.navigate(['/requests', id]);
  }

  createNewRequest(): void {
    this.requestApi.navigate(['/requests/new']);
  }
}
