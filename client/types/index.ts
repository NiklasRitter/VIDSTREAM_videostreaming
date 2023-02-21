export interface Video {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
  thumbnailId: string;
}

export interface Thumbnail {
  _id: string;
  owner: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
}

export enum QueryKeys {
  currentUser = "currentUser",
  videos = "videos",
}

export interface CurrentUser {
  _id: string;
  email: string;
  username: string;
}
