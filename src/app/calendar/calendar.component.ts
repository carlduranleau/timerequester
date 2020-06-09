import { Component, OnInit } from '@angular/core';
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

  constructor(private requestApi: RequestapiService) { }

  ngOnInit(): void {
    this.requestApi.getRequests().subscribe((data: any[])=>{
      this.events = this.generateEvents(data);
      this.events.forEach(e => {
        $('#calendar').fullCalendar('renderEvent', e);
      });
    })
    $("#calendar").fullCalendar({
                    header: {
                        left   : 'prev,next today',
                        center : 'title',
                        right  : 'month,agendaWeek,agendaDay'
                    },
                    navLinks   : true,
                    editable   : true,
                    eventLimit : true
                });
   }

  generateEvents(requests) {
    var events = [];

    requests.forEach(r => {
      events.push({
        title: r.firstname + " " + r.lastname,
        color: "#f9c66a",
        start: r.created
      });
    });

     return events;
  }
}