import { Component }            from 'angular2/core';
import { EventsListComponent }  from './events-list.component';
import { EventService }         from '../../services/event.service';

@Component({
  selector: 'events',
  template: `<events-list></events-list>`,
  providers:[EventService],
  directives:[EventsListComponent]
})

export class EventsComponent { }