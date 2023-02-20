import { boolean, object, string, TypeOf } from "zod";

export const updateThumbnailSchema = {
  body: object({
    videoId: string(),
  }),
  params: object({
    thumbnailId: string(),
  }),
};

export type UpdateThumbnailBody = TypeOf<typeof updateThumbnailSchema.body>;
export type UpdateThumbnailParams = TypeOf<typeof updateThumbnailSchema.params>;
