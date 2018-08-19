export interface Episode {
  _id?: string;
  channelId: number;
  channelName: string;
  title: string;
  description: string;
  publishDate: Date;
  coverImage: string;
  duration: number;
  url: {
    url: string;
    type: string;
    length: number;
  };
  created: Date;
  referenced: boolean;
  playing?: boolean;
}