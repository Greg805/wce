/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap}        									        from 'angular2/platform/browser';
import {LocationStrategy, HashLocationStrategy, ROUTER_PROVIDERS}   from 'angular2/router';
import {AppComponent}              									from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);