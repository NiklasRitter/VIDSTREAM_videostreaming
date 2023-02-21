import {
  updateThumbnail,
  updateVideo,
  uploadThumbnail,
  uploadVideo,
} from "@/api";
import { useVideo } from "@/context/videos";
import { Thumbnail, Video } from "@/types";
import {
  Button,
  Group,
  Modal,
  Text,
  Progress,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { ArrowBigUpLine } from "tabler-icons-react";

function EditVideoForm({
  videoId,
  setOpened,
  setProgressVideo,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setProgressVideo: Dispatch<SetStateAction<number>>;
}) {
  const { refetch } = useVideo();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: false,
    },
  });

  const mutationUpdateVideo = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>["0"]
  >(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      setProgressVideo(0);
      setProgressThumbnail(0);
      refetch();
    },
  });

  const mutationUpdateThumbnail = useMutation<
    AxiosResponse<Thumbnail>,
    AxiosError,
    Parameters<typeof updateThumbnail>["0"]
  >(updateThumbnail);

  const mutationUploadThumbail = useMutation(uploadThumbnail);

  // stateful variables
  const [progressThumbnail, setProgressThumbnail] = useState(0);
  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgressThumbnail(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();
    formData.append("image", files[0]);
    mutationUploadThumbail.mutate({ formData, config });
  }

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const thumbnailId = mutationUploadThumbail.data.thumbnailId;
        mutationUpdateThumbnail.mutate({ thumbnailId, videoId });
        mutationUpdateVideo.mutate({ videoId, thumbnailId, ...values });
      })}
    >
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="Put in the new video title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Description"
          required
          {...form.getInputProps("description")}
        />

        {progressThumbnail === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[MIME_TYPES.png]}
            multiple={false}
            children={
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: "50vh",
                  justifyContent: "center",
                }}
              >
                <ArrowBigUpLine />
                <Text>Drag thumbnail here or click to find</Text>
              </Group>
            }
          ></Dropzone>
        )}

        {progressThumbnail > 0 && (
          <Progress
            size="xl"
            label={`${progressThumbnail}%`}
            value={progressThumbnail}
            mb="xl"
          />
        )}

        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

function UploadVideo() {
  // stateful variables
  const [opened, setOpened] = useState(false);
  const [progressVideo, setProgressVideo] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgressVideo(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();

    formData.append("video", files[0]);

    mutation.mutate({ formData, config });
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload video"
        size="xl"
      >
        {progressVideo === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
            children={
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: "50vh",
                  justifyContent: "center",
                }}
              >
                <ArrowBigUpLine />
                <Text>Drag video here or click to find</Text>
              </Group>
            }
          ></Dropzone>
        )}

        {progressVideo > 0 && (
          <Progress
            size="xl"
            label={`${progressVideo}%`}
            value={progressVideo}
            mb="xl"
          />
        )}

        {mutation.data && progressVideo > 0 && (
          <EditVideoForm
            setOpened={setOpened}
            videoId={mutation.data.videoId}
            setProgressVideo={setProgressVideo}
          />
        )}
      </Modal>

      <Button onClick={() => setOpened(true)} variant="filled" color="gray">
        Upload video
      </Button>
    </>
  );
}

export default UploadVideo;
