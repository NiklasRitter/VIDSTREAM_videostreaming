import { Card, Text, Image } from "@mantine/core";
import Link from "next/link";
import { Video } from "../types";

function VideoTeaser({ video }: { video: Video }) {
  return (
    <Link href={`/watch/${video.videoId}`} passHref>
      <Card shadow="sm" p="xl" component="a" href={`/watch/${video.videoId}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/thumbnails/${video.thumbnailId}`}
          alt="thumbnail"
          width={"100%"}
          height={180}
        />
        <Text weight={500} size="lg">
          {video.title}
        </Text>
        <Text size="sm">{video.description}</Text>
      </Card>
    </Link>
  );
}

export default VideoTeaser;
