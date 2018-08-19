import { HTTP } from 'meteor/http'
import * as  fastXmlParser from 'fast-xml-parser';
import * as moment from 'moment';
import { Utils } from './utils.class';
import { HTTPResponse } from 'typings/http';
const utils = new Utils();
import { Episodes } from 'imports/collections/episodes';
import { Episode } from 'imports/models/episode';
import { Observable, of } from 'rxjs';


export class EpisodesClass {


  constructor() {

  }

  get( channelId: number ): Observable<Episode[]> {
    return of( Episodes.find( { channelId: channelId }, { sort: { publishDate: 1 }} ).fetch() );
  }


}