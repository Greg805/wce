import {Component, OnInit}     from 'angular2/core';
import {Router, RouteParams}   from 'angular2/router';
import {Place, PlaceService}   from '../../services/place.service';

@Component({
  template: `
    <ul class="places">
      <li *ngFor="#place of places"
        [class.selected]="isSelected(place)"
        (click)="onSelect(place)">
        <span>{{place.id}}</span> {{place.name}}
      </li>
    </ul>
  `
})

export class PlacesListComponent implements OnInit {
  places: Place[];

  private _selectedId: number;

  constructor(
    private _service: PlaceService,
    private _router: Router,
    routeParams: RouteParams) {
      this._selectedId = +routeParams.get('id');
  }

  isSelected(place: Place) { return place.id === this._selectedId; }

  onSelect(place: Place) {
    this._router.navigate( ['PlaceDetail', { id: place.id }] );
  }

  ngOnInit() {
    this._service.getPlaces().then(places => this.places = places)
  }
}