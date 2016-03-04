import {Injectable} from 'angular2/core';

export class Event {
  constructor(public id: number, public name: string) { }
}

@Injectable()
export class EventService {
  getEvents() { return eventsPromise; }

  getEvent(id: number | string) {
    return eventsPromise
      .then(events => events.filter(h => h.id === +id)[0]);
  }
}

var EVENTS = [
	new Event(1, 'Mr. Nice'),
	new Event(2, 'Narco'),
	new Event(3, 'Bombasto')
];

var eventsPromise = Promise.resolve(EVENTS);