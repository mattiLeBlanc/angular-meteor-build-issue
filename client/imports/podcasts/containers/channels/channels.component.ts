import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';



@Component( {
  selector: 'channels',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ 'channels.component.scss' ],
  template: `
  <div>CHANNELS PAGE WORKING</div>

  `,
} )

export class ChannelsComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }
}
