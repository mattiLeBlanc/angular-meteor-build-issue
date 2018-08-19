import { Meteor } from 'meteor/meteor';
import { ChannelsClass } from '../lib/channels.class';
import { Channel } from 'imports/models/channel';
const channels               = new ChannelsClass();

Meteor.methods( {

  'channels.search': ( term: string ) => {
    return channels.search( term );
  },

  'channels.loadEpisodes': ( channel: Channel ) => {
    return channels.loadEpisodes( channel );
  }
});