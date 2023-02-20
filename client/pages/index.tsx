import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import HomePageLayout from "@/layout/Home";
import { ReactElement } from "react";
import { useVideo } from "@/context/videos";
import { SimpleGrid } from "@mantine/core";
import VideoTeaser from "@/components/VideoTeaser";

export default function Home() {
  const { videos } = useVideo();

  return (
    <div className={styles.container}>
      <SimpleGrid cols={3}>
        {(videos || []).map((video) => {
          return <VideoTeaser key={video.videoId} video={video} />;
        })}
      </SimpleGrid>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};