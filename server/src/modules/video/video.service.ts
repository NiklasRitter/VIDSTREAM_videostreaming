import { Video, VideoModel } from "./video.model";

export function createVideo({ owner }: { owner: string }) {
  // create a video and later update properties of the video (e.g. title)
  return VideoModel.create({ owner });
}

export function findVideo(videoId: Video["videoId"]) {
  return VideoModel.findOne({ videoId });
}

export function findPublishedVideos() {
  return VideoModel.find({
    published: true,
  }).lean();
}
