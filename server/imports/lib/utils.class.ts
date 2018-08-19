import { HTTP } from 'meteor/http'
import { HTTPResponse } from 'typings/http';

export class Utils {

  constructor() {

  }

  isUrl( url: string ): boolean {
    const match = url.match( /(https?:\/\/)[\S-]+(\.[\S-]+)+\.?(:\d+)?(\/\S*)?/gi );
    return !!match;
  }

  httpGet( url: string, options?: any ): any {
    const httpResponse: HTTPResponse<any> = HTTP.get( url, options );
    if ( httpResponse.statusCode === 200 ) {
      return httpResponse.content;
    } else {
      console.error( httpResponse.content );
    }
  }
}