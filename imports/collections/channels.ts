import { MongoObservable } from 'meteor-rxjs';
import { Channel } from '../models/channel';

export const Channels = new MongoObservable.Collection<Channel>( 'channels' );
