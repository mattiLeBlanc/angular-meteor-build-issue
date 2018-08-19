import { Dictionary } from 'underscore';

export interface ITunesChannelItem {
  wrapperType: string;
  kind:  string;
  collectionId: number;
  trackId: number;
  artistName:  string;
  collectionName:  string;
  trackName:  string;
  collectionCensoredName:  string;
  trackCensoredName:  string;
  collectionViewUrl:  string;
  feedUrl:  string;
  trackViewUrl:  string;
  artworkUrl30:  string;
  artworkUrl60:  string;
  artworkUrl100:  string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate:  string;
  collectionExplicitness:  string;
  trackExplicitness:  string;
  trackCount: number;
  country:  string;
  currency:  string;
  primaryGenreName:  string;
  contentAdvisoryRating:  string;
  artworkUrl600:  string;
  genreIds: string[],
  genres: string[];
}

export interface ITunesFeedContent {
  title: string;
  description: string;
  managingEditor: string;
  copyright: string;
  'atom:link': Dictionary<string>;
  link: string;
 'itunes:new-feed-url': string;
  'itunes:owner': string;
  'itunes:author': string;
  'itunes:summary': string;
  language: string;
  'itunes:explicit': string;
  'itunes:category': { $text: string };
  'itunes:keywords': string;
  'itunes:type': string;
  'itunes:image': { $href: string };
  image: string;
  item: ITunesFeedItem | ITunesFeedItem[];

}

export interface ITunesFeedItem {
  title: string;
  'itunes:title': string;
  'itunes:episodeType': string;
  'itunes:summary': string;
  pubDate: Date;
  'itunes:explicit': 'yes' | 'no';
  'itunes:image': {
    $href: string;
  }
  'itunes:keywords': string;
  'itunes:duration': string;
  enclosure:{ '$url': string;
    '$type': string;
    '$length': string;
  }
}