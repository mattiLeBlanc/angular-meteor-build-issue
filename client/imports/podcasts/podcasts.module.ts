import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

import { matDesign } from './components/mat-design';

// services
// import * as fromServices from './services';

// guards
// import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.ChannelsComponent,
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature( 'podcasts', {} ),
    ...matDesign
  ],
  providers: [
    // ...fromServices.services,
    // ...fromGuards.guards
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  exports: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
})
export class PodcastsModule {}
