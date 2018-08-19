import { Meteor } from 'meteor/meteor';
import { EpisodesClass } from '../lib/episodes.class';
import { Observable } from 'rxjs';
import { Episode } from 'imports/models/episode';
const episodes            = new EpisodesClass();


Meteor.methods( {

  // Get episodes
  //
  'episodes.get': ( channelId: number  ): Observable<Episode[]> => {
    return episodes.get( channelId );
  }

});