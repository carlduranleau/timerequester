import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
	{ path: '', component: CalendarComponent },
	{ path: 'contact', component: ContactUsComponent },
	{ path: 'requests', component: RequestListComponent },
	{ path: 'requests/new', component: RequestFormComponent },
	{ path: 'requests/:requestId', component: RequestDetailsComponent }
];

@NgModule({
  declarations: [
    ContactUsComponent,
    RequestFormComponent,
    CalendarComponent,
    RequestListComponent,
    RequestDetailsComponent
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
