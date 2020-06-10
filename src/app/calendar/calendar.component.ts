import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestapiService } from '../requestapi.service';
declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  events = [];
  isAuthenticated: boolean;

  constructor(private router:Router, private requestApi: RequestapiService) { }

  ngOnInit(): void {
    this.requestApi.getRequests().subscribe((data: any[])=>{
      this.events = this.generateEvents(data);
      this.events.forEach(e => {
        $('#calendar').fullCalendar('renderEvent', e);
      });
    });
    var globalRouter = this.router;
    var globalRequestApi = this.requestApi;
    $("#calendar").fullCalendar({
        navLinks   : true,
        editable   : true,
        eventLimit : true,
        customButtons: {
          createButton: {
            text: 'Create request',
            click: function() {
              globalRouter.navigate(['/requests/new']);
            }
          }
        },
        eventClick : function(event) {
          globalRouter.navigate(['/requests', event.id]);
        },
        eventDrop: function(event, delta, revertFunc) {
          globalRequestApi.getRequest(event.id).subscribe((data: any)=>{
            var request = data;
            request.date = event.start;
            this.httpSub = globalRequestApi.saveRequest(request).subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                revertFunc();
                console.log(err);
              }
            );
          })
        },
        header: {
            left   : 'prev,next today',
            center : 'title',
            right  : 'createButton month,agendaWeek,agendaDay'
        }
    });
   }

  generateEvents(requests) {
    var events = [];

    requests.forEach(r => {
      events.push({
        id: r.id,
        title: r.firstname + " " + r.lastname,
        color: "#f9c66a",
        start: r.date
      });
    });

     return events;
  }
}