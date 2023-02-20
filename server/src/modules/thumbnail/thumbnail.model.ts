import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { customAlphabet } from "nanoid";
import { User } from "../user/user.model";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export class Thumbnail {
  @prop({ unique: true, default: () => nanoid() })
  public thumbnailId: string;

  @prop({ enum: ["png"] })
  public extension: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop()
  public videoId: string;
}

export const ThumbnailModel = getModelForClass(Thumbnail, {
  schemaOptions: {
    timestamps: true,
  },
});
