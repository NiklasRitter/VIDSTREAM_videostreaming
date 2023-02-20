import { updateVideo, uploadVideo } from "@/api";
import { useVideo } from "@/context/videos";
import { Video } from "@/types";
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

  const mutation = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>["0"]
  >(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      refetch();
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}
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

        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

export default function UploadVideo() {
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

      <Button onClick={() => setOpened(true)}>Upload video</Button>
    </>
  );
}
