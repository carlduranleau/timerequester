import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.less']
})
export class RequestDetailsComponent implements OnInit {

  requestId;
  request:any = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      onsite: 'no',
      description: ''
  };
  private paramSub: any;
  private httpSub: any;

  constructor(private router:Router, private route: ActivatedRoute, private requestApi: RequestapiService) { }

  ngOnInit(): void {
  	this.paramSub = this.route.params.subscribe( params => {
  		this.requestId = params.requestId;
	  	this.httpSub = this.requestApi.getRequest(this.requestId).subscribe((data: any[])=>{
	  		this.request = data;
	  	});
  	});
  }

  ngOnDestroy(): void {
  	this.paramSub.unsubscribe();
  	this.httpSub.unsubscribe();
  }

  callTo(phoneNumber): void {
  	alert("Calling " + phoneNumber);
  }

  writeTo(email): void {
  	alert("Creating email to " + email);
  }

  edit(id): void {
    this.router.navigate(['/requests', id, 'edit']);
  }

  delete(id): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.httpSub = this.requestApi.deleteRequest(id).subscribe((data: any[])=>{
        // We may handle errors here
      });
      this.router.navigate(['/requests']);
    }
  }

  gotoRequests(): void {
  	this.router.navigate(['/requests']);
  }
}
