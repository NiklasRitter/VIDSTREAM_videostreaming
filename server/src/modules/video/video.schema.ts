import { boolean, object, string, TypeOf } from "zod";

export const updateVideoSchema = {
  body: object({
    title: string(),
    thumbnailId: string(), //TODO: Do I need the thumbnail on the video?
    description: string(),
    published: boolean(),
  }),
  params: object({
    videoId: string(),
  }),
};

export type UpdateVideoBody = TypeOf<typeof updateVideoSchema.body>;
export type UpdateVideoParams = TypeOf<typeof updateVideoSchema.params>;
