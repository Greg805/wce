import {Component,  OnInit}    from 'angular2/core';
import {RouteParams, Router}   from 'angular2/router';
import {Place, PlaceService}   from '../../services/place.service';

@Component({
  template: `
  <h2>PLACES</h2>
  <div *ngIf="place">
    <h3>"{{place.name}}"</h3>
    <div>
      <label>Id: </label>{{place.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="place.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoPlaces()">Back</button>
    </p>
  </div>
  `,
})

export class PlaceDetailComponent implements OnInit  {
  place: Place;

  constructor(
    private _router:Router,
    private _routeParams:RouteParams,
    private _service:PlaceService){}

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._service.getPlace(id).then(place => this.place = place);
  }

  gotoPlaces() {
    let placeId = this.place ? this.place.id : null;
    this._router.navigate(['Places',  {id: placeId, foo: 'foo'} ]);
  }
}