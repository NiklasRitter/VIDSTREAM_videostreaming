import { Thumbnail, ThumbnailModel } from "./thumbnail.model";

export function createThumbnail({ owner }: { owner: string }) {
  // create a thumbnail and later update properties of the thumbnail (e.g. videoId)
  return ThumbnailModel.create({ owner });
}

export function findThumbnail(thumbnailId: Thumbnail["thumbnailId"]) {
  return ThumbnailModel.findOne({ thumbnailId });
}
