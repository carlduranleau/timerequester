import { Component, OnInit } from '@angular/core';
declare var $: any;

/**
const RequestSchema = {
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  onsite: { type: String, required: true },
  description: { type: String, required: true },
  createdon: { type: String, required: true },
  status: { type: String, required: true }
};
*/

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  isAuthenticated: boolean;
  constructor() { }

  ngOnInit(): void{
       setTimeout(() => {
        $("#calendar").fullCalendar({  
                        header: {
                            left   : 'prev,next today',
                            center : 'title',
                            right  : 'month,agendaWeek,agendaDay'
                        },
                        navLinks   : true,
                        editable   : true,
                        eventLimit : true,
                        events: [
                            {
                                title : 'This is your',
                                start : '2020-03-03T12:30:00',
                                color : '#f9c66a' // override!
                            },
                            {
                                title : 'Your meeting with john',
                                start : '2020-03-07T12:30:00',
                                end   : '2019-03-09',
                                color : "#019efb"
                            },
                            {
                                title  : 'This is Today',
                                start  : '2020-03-12T12:30:00',
                                allDay : false, // will make the time show,
                                color  : "#57cd5f"
                            }
                        ],  // request to load current events
                    });
     }, 100);
   }
}