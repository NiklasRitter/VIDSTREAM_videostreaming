import HomePageLayout from "@/layout/Home";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import styles from "@/styles/Home.module.css";

function WatchVideoPage() {
  const { query } = useRouter();

  return (
    <div className={styles.centered_horizontal}>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
        width="1000px"
        height="auto"
        controls
        autoPlay
        id="video-player"
      />
    </div>
  );
}

WatchVideoPage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default WatchVideoPage;
