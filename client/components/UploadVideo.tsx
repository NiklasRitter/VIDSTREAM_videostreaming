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
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { refetch } = useVideo();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });

  const mutation1 = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>["0"]
  >(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      refetch();
    },
  });

  const mutation3 = useMutation<
    AxiosResponse<Thumbnail>,
    AxiosError,
    Parameters<typeof updateThumbnail>["0"]
  >(updateThumbnail);

  const [progress, setProgress] = useState(0);

  const mutation2 = useMutation(uploadThumbnail);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();

    formData.append("image", files[0]);

    mutation2.mutate({ formData, config });
  }

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        const thumbnailId = mutation2.data.thumbnailId;
        mutation3.mutate({ thumbnailId, videoId });
        mutation1.mutate({ videoId, thumbnailId, ...values });
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

        {progress === 0 && (
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

        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}

        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

function UploadVideo() {
  // "stateful variables"
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
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
        {progress === 0 && (
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

        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}

        {mutation.data && (
          <EditVideoForm
            setOpened={setOpened}
            videoId={mutation.data.videoId}
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
