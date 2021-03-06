import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.less']
})
export class RequestFormComponent implements OnInit {

  requestId;
  request:any = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      onsite: 'no',
      description: '',
      status: 'New',
      date: ''
  };
  private paramSub: any;
  private httpSub: any;

  requestForm;

  constructor(private router:Router, private route: ActivatedRoute, private requestApi: RequestapiService, private formBuilder: FormBuilder) {
  	this.requestForm = this.formBuilder.group({
  		firstname: '',
  		lastname: '',
  		email: '',
      phone: '',
  		onsite: 'no',
      description: '',
      status: 'New',
      date: ''
  	});
  }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe( params => {
      this.requestId = params.requestId;
      if (this.requestId) {
        this.httpSub = this.requestApi.getRequest(this.requestId).subscribe((data: any[])=>{
          this.request = data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    if (this.httpSub) {
      this.httpSub.unsubscribe();
    }
  }

  cancel(): void {
    history.back();
  }

  onRequestSent(requestData): void {
  	if (!requestData.email || !requestData.email.includes('.') || !requestData.email.includes('@')) {
  		alert ("Une adresse courriel valide est obligatoire.");
  		return;
  	}

    requestData.id = this.requestId;
    this.httpSub = this.requestApi.saveRequest(requestData).subscribe(
      (res) => {
        console.log(res);
        this.requestApi.navigate(['/requests', res.id]);
      },
      (err) => console.log(err)
    );
  }
}