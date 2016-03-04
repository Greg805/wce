import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {DialogService}                  from './services/dialog.service';
import {EventService}                   from './services/event.service';
import {PlaceService}                   from './services/place.service';
import {EventsListComponent}            from './components/events/events-list.component';
import {EventDetailComponent}           from './components/events/event-detail.component';
import {PlacesListComponent}            from './components/places/places-list.component';
import {PlaceDetailComponent}           from './components/places/place-detail.component';

@Component({
  selector: 'app',
  styleUrls: ['app/css/app.css'],
  providers:  [DialogService, EventService, PlaceService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <img id="logo" src="app/img/logo.png" alt="logo" />
    <div id="content">
        <h1 class="title">WhatComEvent</h1>
        <nav>
          <a class="lk" [routerLink]="['Events']">Events</a>
          <a class="lk" [routerLink]="['Places']">Places</a>
        </nav>
        <router-outlet></router-outlet>
    </div>
  `,
})
    
@RouteConfig([
  {path: '/',          name: 'Home',        component: EventsListComponent, useAsDefault: true},
  {path: '/events',    name: 'Events',      component: EventsListComponent},
  {path: '/event/:id', name: 'EventDetail', component: EventDetailComponent},
  {path: '/places',    name: 'Places',      component: PlacesListComponent},
  {path: '/places/:id',name: 'PlaceDetail', component: PlaceDetailComponent}
])
    
export class AppComponent { }