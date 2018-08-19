import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';



@Component( {
  selector: 'channels',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ 'channels.component.scss' ],
  template: `
  <div>CHANNELS PAGE WORKING</div>
  <mat-form-field>
    <input matInput placeholder="Favorite food" value="Sushi">
  </mat-form-field>


  `,
} )

export class ChannelsComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }
}
