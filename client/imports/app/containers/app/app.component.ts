import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-root',
  styleUrls: [ './app.component.scss' ],
  template: `
    <div class="app" fxLayout="column">
      <div class="app__content" fxLayout="column" fxFlex="100">
        <div class="wrapper" >
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="app__footer" fxLayout="column">
      </div>
    </div>
  `,
} )
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
