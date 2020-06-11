import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestapiService {

  private REST_API_SERVER = "http://localhost:8080";

  private usertoken = "";

  constructor(private httpClient: HttpClient, private router:Router) { }

  public login(user, pass) {
    try {
        return this.validateLogin(this.httpClient.post(this.REST_API_SERVER + "/login",
        {
          "user":user,
          "pass":window.btoa(pass)
        }));
    } catch (err) {
      this.redirectToLogin();
    }
  }

  public redirectToLogin() {
    this.router.navigate(['login']);
  }

  public getRequests() {
    try {
  	  return this.validateLogin(this.httpClient.get(this.getTokenizedUrl("/requests")));
    } catch (err) {
      this.redirectToLogin();
    }
  }

  public getRequest(id) {
    try {
      return this.validateLogin(this.httpClient.get(this.getTokenizedUrl("/requests/" + id)));
    } catch (err) {
      this.redirectToLogin();
    }
  }

  public saveRequest(request) {
    try {
      if (request && request.id) {
        return this.validateLogin(this.httpClient.put<any>(this.getTokenizedUrl("/request"), request));
      } else {
        return this.validateLogin(this.httpClient.post<any>(this.getTokenizedUrl("/request"), request));
      }
    } catch (err) {
      this.redirectToLogin();
    }
  }

  public deleteRequest(id) {
    try {
      return this.validateLogin(this.httpClient.delete(this.getTokenizedUrl("/request/" + id)));
    } catch (err) {
      this.redirectToLogin();
    }
  }

  public getLogs() {
    try {
      return this.validateLogin(this.httpClient.get(this.getTokenizedUrl("/logs")));
    } catch (err) {
      this.redirectToLogin();
    }
  }

  public navigate(urlParts:string[]) {
    if (this.usertoken) {
      this.router.navigate(urlParts, { queryParams: { token: this.usertoken }});
    } else {
      this.router.navigate(urlParts);
    }
  }

  private validateLogin(httpSub) {
    httpSub.subscribe(
      (data:any) => {
        if (data.token) {
          this.usertoken = data.token;
        }
      },
      (err) => {
        if (err.status === 403) {
          this.router.navigate(['login']);
        }
      }
    );

    return httpSub;
  }

  private getTokenizedUrl(url) {
    var fullUrl = this.REST_API_SERVER + url;
    if (this.usertoken) {
      return fullUrl + "?token=" + this.usertoken;
    }
    return fullUrl;
  }
}
