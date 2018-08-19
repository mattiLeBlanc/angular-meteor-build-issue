// import { HTTP } from 'meteor/http'
// import * as  fastXmlParser from 'fast-xml-parser';
// import * as moment from 'moment';
// import { Utils } from './utils.class';
// import { HTTPResponse } from 'typings/http';
// const utils = new Utils();
// import { Episodes } from 'imports/collections/episodes';
// import { ITunesFeedItem } from 'imports/models/itunes';
// import { Episode } from 'imports/models/episode';
// import { Channel } from 'imports/models/channel';



// export class Feeds {


//   constructor() {

//   }

//   get( payload: Channel ): void {

//     if ( !payload ) { return; }
//     if ( !utils.isUrl( payload.feedUrl ) ) { return; }

//     HTTP.get( payload.feedUrl, {}, ( error, response: HTTPResponse<any> ) => {
//       if ( error ) {
//         console.error( error );
//       }
//       if ( response.statusCode === 200 ) {

//         this.getXml( payload, response.content );
//       }
//     } );
//   }


//   getXml( payload: Channel, xml: string ): Object {


//     const response = fastXmlParser.parse( xml, {
//       attributeNamePrefix: '$',
//       ignoreAttributes: false
//     } );

//     if ( response.rss && response.rss.channel ) {
//       const channel = response.rss.channel;

//       const items = channel.item instanceof( Array ) ? channel.item : [ channel.item ];

//       // Episodes.collection.remove( {} );
//       // Episodes.collection.remove( { channelId: payload.trackId, referenced: false } );


//       items.forEach( ( item: ITunesFeedItem ) => {

//         Episodes.upsert( { channelId: payload.trackId, title: item[ 'itunes:title' ] || item.title }, {
//           channelId: payload.trackId,
//           channelName: payload.trackName, // maybe later store CHannel in DB
//           title: item[ 'itunes:title' ] || item.title,
//           description: item[ 'itunes:summary' ],
//           publishDate: item.pubDate,
//           coverImage: item[ 'itunes:image' ].$href,
//           duration: this.getDuration( item[ 'itunes:duration' ] ),
//           url: {
//             url: item.enclosure.$url,
//             length: parseInt( item.enclosure.$length, 10 ),
//             type: item.enclosure.$type
//           },
//           created: new Date(),
//           referenced: false,
//         } );
//       } );
//     }
//     return {};
//   }

//   getDuration( value: any ): number {
//     if ( Number.isInteger( value ) ) {
//       return value;
//     } else {
//       return moment( value, 'HH:mm:ss' ).diff( moment().startOf( 'day' ), 'seconds' );
//     }

//   }
// }