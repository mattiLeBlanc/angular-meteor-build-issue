import { MongoObservable } from 'meteor-rxjs';
import { Episode } from '../models/episode';

export const Episodes = new MongoObservable.Collection<Episode>( 'episodes' );
