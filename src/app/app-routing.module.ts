import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormtitleDirective } from './formtitle.directive';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { LogsComponent } from './logs/logs.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: '', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
	{ path: 'contact', component: ContactUsComponent },
	{ path: 'requests', component: RequestListComponent },
	{ path: 'requests/new', component: RequestFormComponent },
	{ path: 'requests/:requestId', component: RequestDetailsComponent },
  { path: 'requests/:requestId/edit', component: RequestFormComponent },
  { path: 'logs', component: LogsComponent },
];

@NgModule({
  declarations: [
    FormtitleDirective,
    ContactUsComponent,
    RequestFormComponent,
    CalendarComponent,
    RequestListComponent,
    RequestDetailsComponent,
    LogsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forRoot(routes, { useHash: true })
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
