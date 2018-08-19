import * as childProcess from 'child_process';
import { HTTP } from 'meteor/http'
import { Utils } from './utils.class';
import { HTTPResponse } from 'typings/http';
import { ITunesChannelItem, ITunesFeedContent } from 'imports/models/itunes';
import { Channel } from 'imports/models/channel';
import { Channels } from 'imports/collections/channels';
import { Mongo } from 'meteor/mongo'

import * as  fastXmlParser from 'fast-xml-parser';
import * as moment from 'moment';
import { ITunesFeedItem } from 'imports/models/itunes';
import { Episode } from 'imports/models/episode';
import { Observable, of } from 'rxjs';
import { Cache } from '../services/cache.service';
import { Meteor } from 'meteor/meteor';




const utils = new Utils();
const cache = new Cache( 60 );

interface ChannelResponse {
  recordCount: number;
  results: ITunesChannelItem[];
}



export class ChannelsClass {

  constructor() {}

  search( term: string ): Channel[] {

    if ( !term ) { return; }

    // Podcast attributes: titleTerm, languageTerm, authorTerm, genreIndex, artistTerm, ratingIndex, keywordsTerm, descriptionTerm
    const params = {
      term,
      limit: '200',
      entity: 'podcast',
      attribute: 'titleTerm'
    };
    const response: HTTPResponse<ChannelResponse> = HTTP.get( 'https://itunes.apple.com/search?media=podcast', { params } );
    if ( response.statusCode === 200 ) {

      const channels = response.data.results.map( item => {

        // test if we already have this channel stored in our DB
        //
        const channelItem = Channels.findOne( { trackName: item.trackName, trackId: item.trackId } );
        const channel = channelItem || {
          _id: new Mongo.ObjectID().toHexString(),
          trackId: item.trackId,
          artistName: item.artistName,
          trackName: item.trackName,
          feedUrl: item.feedUrl,
          artworkUrl60: item.artworkUrl60,
          artworkUrl100: item.artworkUrl100,
          artworkUrl600: item.artworkUrl600,
        }

        if ( !cache.get( channel.trackId ) ) {

          // fetch channel content asynchronously in separate process so that it is non-blocking
          //
          const cp = childProcess.fork( Assets.absoluteFilePath( 'channel-loader.js') );

          cp.on('message', Meteor.bindEnvironment( ( msg: any ) => {
            if ( msg.error ) {
              throw new Meteor.Error( msg.error.code, msg.error.message );
            }
            // add the channel description to the channel object and store it
            //
            channel.description = msg.description.replace( /<[^>]*>/g, '' ) || '';
            this.store( channel );
            // Then cache the channel content for later episode fetching.
            //
            cache.set( item.trackId, msg );
            cp.kill( 'SIGINT' );
          }) );
          cp.send( { action: 'GET_CHANNEL_DATA', payload: { url: channel.feedUrl } });


        }

        // const channelContent = this.getChannelData( channel.feedUrl );
        // channel.description = channelContent.description.replace( /<[^>]*>/g, '' ) || '';
        // this.store( channel );

        // Then cache the channel content for later episode fetching.
        //
        // cache.set( item.trackId, channelContent );
        return channel;
      } );
      return channels;
    }
  }

  getChannelData( url: string ): ITunesFeedContent {
    const content = utils.httpGet( url );

    const response = fastXmlParser.parse( content, {
      attributeNamePrefix: '$',
      ignoreAttributes: false
    } );

    if ( response.rss && response.rss.channel ) {
      return response.rss.channel;
    } else {
      throw new Meteor.Error( 'ChannelsNoRssFeed', 'No channel found in RSS feed' );
    }

  }




  store( channel: Channel ): void {
    Channels.upsert( { trackName: channel.trackName, trackId: channel.trackId }, channel );
  }


  loadEpisodes( channel: Channel ): Observable<Episode[]> {
    if ( !channel ) { return; }
    if ( !utils.isUrl( channel.feedUrl ) ) { return; }

    let cachedChannel: ITunesFeedContent = cache.get( channel.trackId );
    if ( cachedChannel ) {
      console.log('getting episoes from cache');
    }
    if ( !cachedChannel ) {
      cachedChannel = this.getChannelData( channel.feedUrl );
      cache.set( channel.trackId, cachedChannel );
    }
    return of( this.extractEpisodes( channel, cachedChannel ) );

  }

  extractEpisodes( channel: Channel, channelContent: ITunesFeedContent ): Episode[] {
    const episodes: Episode[] = [];

    const items = channelContent.item instanceof ( Array ) ? channelContent.item : [ channelContent.item ];

      items.forEach( ( item: ITunesFeedItem ) => {

        episodes.push( {
          _id: new Mongo.ObjectID().toHexString(),
          channelId: channel.trackId,
          channelName: channel.trackName, // maybe later store CHannel in DB
          title: item[ 'itunes:title' ] || item.title,
          description: item[ 'itunes:summary' ],
          publishDate: item.pubDate,
          coverImage: item[ 'itunes:image' ].$href,
          duration: this.getDuration( item[ 'itunes:duration' ] ),
          url: {
            url: item.enclosure.$url,
            length: parseInt( item.enclosure.$length, 10 ),
            type: item.enclosure.$type
          },
          created: new Date(),
          referenced: false,
        } );
      } );
    return episodes;
  }


  getDuration( value: any ): number {
    if ( Number.isInteger( value ) ) {
      return value;
    } else {
      return moment( value, 'HH:mm:ss' ).diff( moment().startOf( 'day' ), 'seconds' );
    }

  }
}

