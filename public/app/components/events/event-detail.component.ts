import {Component,  OnInit}    from 'angular2/core';
import {RouteParams, Router}   from 'angular2/router';
import {Event, EventService}   from '../../services/event.service';

@Component({
  template: `
  <h2>EVENTS</h2>
  <div *ngIf="event">
    <h3>"{{event.name}}"</h3>
    <div>
      <label>Id: </label>{{event.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="event.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoEvents()">Back</button>
    </p>
  </div>
  `,
})

export class EventDetailComponent implements OnInit  {
  event: Event;

  constructor(
    private _router:Router,
    private _routeParams:RouteParams,
    private _service:EventService){}

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._service.getEvent(id).then(event => this.event = event);
  }

  gotoEvents() {
    let eventId = this.event ? this.event.id : null;
    this._router.navigate(['Events',  {id: eventId, foo: 'foo'} ]);
  }
}