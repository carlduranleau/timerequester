import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { RequestapiService } from '../requestapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  authinfo:any = {
      username: '',
      password: ''
  };
  token;
  error = false;
  loginForm;
  private httpSub: any;

  constructor(private router:Router, private requestApi: RequestapiService, private formBuilder: FormBuilder) {
  	this.loginForm = this.formBuilder.group({
  	  username: '',
  	  password: '',
  	});
  }

  ngOnInit(): void {}

  login(loginData): void {
    this.httpSub = this.requestApi.login(loginData.username, loginData.password).subscribe(
      (data:any) => {
        console.log(data);
        if (data.token && data.token != "") {
        	this.router.navigate(['/'], { queryParams: { token: data.token }});
        } else {
        	this.router.navigate(['/']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.httpSub) {
      this.httpSub.unsubscribe();
    }
  }
}
