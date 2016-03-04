import { Component }            from 'angular2/core';
import { PlacesListComponent }  from './places-list.component';
import { PlaceService }         from '../../services/place.service';

@Component({
  selector: 'places',
  template: `<h2>PLACES</h2><places-list></places-list>`,
  providers:[PlaceService],
  directives:[PlacesListComponent]
})

export class PlacesComponent { }