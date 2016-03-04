import {Component, OnInit}     from 'angular2/core';
import {Router, RouteParams}   from 'angular2/router';
import {Event, EventService}   from '../../services/event.service';

@Component({
  template: `
    <ul class="events">
      <li *ngFor="#event of events"
        [class.selected]="isSelected(event)"
        (click)="onSelect(event)">
        <span>{{event.id}}</span> {{event.name}}
      </li>
    </ul>
  `
})

export class EventsListComponent implements OnInit {
  events: Event[];

  private _selectedId: number;

  constructor(
    private _service: EventService,
    private _router: Router,
    routeParams: RouteParams) {
      this._selectedId = +routeParams.get('id');
  }

  isSelected(event: Event) { return event.id === this._selectedId; }

  onSelect(event: Event) {
    this._router.navigate( ['EventDetail', { id: event.id }] );
  }

  ngOnInit() {
    this._service.getEvents().then(events => this.events = events)
  }
}