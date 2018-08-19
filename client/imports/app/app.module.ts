import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppComponent } from './containers/app/app.component';


// registerLocaleData(localeNl, 'nl');

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: 'search',
    loadChildren: '../podcasts/podcasts.module#PodcastsModule',
  },
];


@NgModule( {
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forRoot( ROUTES ),
    StoreModule.forRoot( {}, {  } ),
    EffectsModule.forRoot( [] ),
    StoreRouterConnectingModule,
  ],

  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
