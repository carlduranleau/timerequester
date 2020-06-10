import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestapiService {

  private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getRequests() {
  	return this.httpClient.get(this.REST_API_SERVER + "/requests").pipe(retry(3), catchError(this.handleError));
  }

  public getRequest(id) {
    return this.httpClient.get(this.REST_API_SERVER + "/requests/" + id).pipe(retry(3), catchError(this.handleError));
  }

  public saveRequest(request) {
    if (request && request.id) {
      return this.httpClient.put<any>(this.REST_API_SERVER + "/request", request);
    } else {
      return this.httpClient.post<any>(this.REST_API_SERVER + "/request", request);
    }
  }

  public deleteRequest(id) {
    return this.httpClient.delete(this.REST_API_SERVER + "/requests/" + id).pipe(retry(3), catchError(this.handleError));
  }

  public getLogs() {
    return this.httpClient.get(this.REST_API_SERVER + "/logs").pipe(retry(3), catchError(this.handleError));
  }
}
