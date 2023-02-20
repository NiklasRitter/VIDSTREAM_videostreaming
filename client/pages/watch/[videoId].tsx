import { useRouter } from "next/router";

//TODO: Add some styling
function WatchVideoPage() {
  const { query } = useRouter();

  return (
    <div>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
        width="800px"
        height="auto"
        controls
        autoPlay
        id="video-player"
      />
    </div>
  );
}

//TODO: export default on top or bottom?
export default WatchVideoPage;
