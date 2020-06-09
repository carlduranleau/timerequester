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
    $("#calendar").fullCalendar({
                    header: {
                        left   : 'prev,next today',
                        center : 'title',
                        right  : 'month,agendaWeek,agendaDay'
                    },
                    navLinks   : true,
                    editable   : true,
                    eventLimit : true,
                    eventClick : function(event) {
                      globalRouter.navigate(['/requests', event.id]);
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
        start: r.created
      });
    });

     return events;
  }
}