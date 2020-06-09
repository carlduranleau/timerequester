import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.less']
})
export class RequestFormComponent implements OnInit {

  requestForm;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
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
  }

  onRequestSent(requestData): void {
  	if (!requestData.email) {
  		alert ("L'adresse courriel est obligatoire.");
  		return;
  	}
    this.httpClient.post<any>("http://localhost:8080/", requestData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  	alert ("Votre demande a été envoyée et sera répondue dans les plus brefs délais. Merci!");
  	this.requestForm.reset();
  	requestData.description = '';
  }
}
