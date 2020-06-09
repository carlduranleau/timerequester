import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.less']
})
export class RequestFormComponent implements OnInit {

  requestId;
  request;
  private paramSub: any;
  private httpSub: any;

  requestForm;

  constructor(private router:Router, private route: ActivatedRoute, private requestApi: RequestapiService, private formBuilder: FormBuilder, private httpClient: HttpClient) {
  	this.requestForm = this.formBuilder.group({
  		firstname: '',
  		lastname: '',
  		email: '',
      phone: '',
  		onsite: 'no',
      description: ''
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

  onRequestSent(requestData): void {
  	if (!requestData.email || !requestData.email.includes('.') || !requestData.email.includes('@')) {
  		alert ("Une adresse courriel valide est obligatoire.");
  		return;
  	}
    if (this.request && this.requestId) {
      requestData.id = this.requestId;
      this.httpClient.put<any>("http://localhost:8080/", requestData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      alert ("Votre demande a été créé et sera répondue dans les plus brefs délais. Merci!");
      this.requestForm.reset();
      requestData.description = '';
    } else {
      this.httpClient.post<any>("http://localhost:8080/", requestData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      alert ("Votre demande a été sauvegardé.");
      requestData.description = '';
    }
  }
}