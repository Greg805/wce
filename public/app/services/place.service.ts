import {Injectable} from 'angular2/core';

export class Place {
  constructor(public id: number, public name: string) { }
}

@Injectable()
export class PlaceService {
  getPlaces() { return placesPromise; }

  getPlace(id: number | string) {
    return placesPromise
      .then(places => places.filter(h => h.id === +id)[0]);
  }
}

var PLACES = [
	new Place(1, 'POPB'),
	new Place(2, 'Batofar'),
	new Place(3, 'Zenith Paris')
];

var placesPromise = Promise.resolve(PLACES);