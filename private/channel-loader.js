const fastXmlParser = require( 'fast-xml-parser' );
const request = require( 'request' );

class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
class InternalError extends Error {
  constructor(code, message) {
    super(code);
    this.error = { code, message};
  }
}

process.on( 'message', async ( msg ) => {
  switch ( msg.action ) {
    case 'GET_CHANNEL_DATA':
      try {
        const channelData = await getChannelData( msg.payload.url )
        process.send( channelData );

      } catch( e ) {
        process.send( e );

      }
    break;
  }
} );

async function getChannelData( url ) {
  try {

    const content = await doRequest( url );


    const response = fastXmlParser.parse( content, {
      attributeNamePrefix: '$',
      ignoreAttributes: false
    } );

    if ( response.rss && response.rss.channel ) {
      return response.rss.channel;
    }
  } catch( e ) {
    return Promise.reject(new InternalError('ChannelsNoRssFeed',  'No channel found in RSS feed' ));

  }
}

function doRequest( url ) {
  return new Promise( function ( resolve, reject ) {
    request( url, function ( error, res, body ) {
      if ( !error && res.statusCode == 200 ) {
        resolve( body );
      } else {
        reject( error );
      }
    } );
  } );
}
