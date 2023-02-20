import busboy from "busboy";
import fs from "fs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createThumbnail, findThumbnail } from "./thumbnail.service";
import { Thumbnail } from "./thumbnail.model";
import { UpdateThumbnailBody, UpdateThumbnailParams } from "./thumbnail.schema";

const MIME_TYPES = ["image/png"];

function getPath({
  thumbnailId,
  extension,
}: {
  thumbnailId: Thumbnail["thumbnailId"];
  extension: Thumbnail["extension"];
}) {
  return `${process.cwd()}/thumbnails/${thumbnailId}.${extension}`;
}

export async function uploadThumbnailHandler(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });

  const user = res.locals.user;

  const thumbnail = await createThumbnail({ owner: user._id });

  // thumbnail uploading
  bb.on("file", async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type");
    }

    const extension = info.mimeType.split("/")[1];

    const filePath = getPath({
      thumbnailId: thumbnail.thumbnailId,
      extension,
    });

    thumbnail.extension = extension;

    await thumbnail.save();

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  // when uploading the thumbnail is finished
  bb.on("close", () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: "close",
      "Content-Type": "application/json",
    });

    res.write(JSON.stringify(thumbnail));
    res.end();
  });

  return req.pipe(bb);
}

export async function updateThumbnailHandler(
  req: Request<UpdateThumbnailParams, {}, UpdateThumbnailBody>,
  res: Response
) {
  const { thumbnailId } = req.params;
  const { videoId } = req.body;

  console.log(thumbnailId);
  console.log(videoId);

  const { _id: userId } = res.locals.user;

  const thumbnail = await findThumbnail(thumbnailId);

  if (!thumbnail) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found");
  }

  if (String(thumbnail.owner) !== String(userId)) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }

  thumbnail.videoId = videoId;

  await thumbnail.save();

  return res.status(StatusCodes.OK).send(thumbnail);
}

export async function getThumbnailHandler(req: Request, res: Response) {
  const { thumbnailId } = req.params;

  const thumbnail = await findThumbnail(thumbnailId);

  if (!thumbnail) {
    return res.status(StatusCodes.NOT_FOUND).send("video not found");
  }

  const filePath = getPath({
    thumbnailId: thumbnail.thumbnailId,
    extension: thumbnail.extension,
  });

  const headers = {
    "Content-Type": `video/${thumbnail.extension}`,
    "Cross-Origin-Resource-Policy": "cross-origin",
  };

  res.writeHead(StatusCodes.OK, headers);

  const videoStream = fs.createReadStream(filePath);

  videoStream.pipe(res);
}
