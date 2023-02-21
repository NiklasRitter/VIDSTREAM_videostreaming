import { Video } from "@/types";
import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;
const thumbnailBase = `${base}/api/thumbnails`;

export function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}

export function loginUser(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function getCurrentUser() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      return null;
    });
}

export function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  return axios
    .post(videosBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  thumbnailId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch<Video>(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}

export function getVideos() {
  return axios.get(videosBase).then((res) => res.data);
}

export function uploadThumbnail({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  return axios
    .post(thumbnailBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function updateThumbnail({
  thumbnailId,
  ...payload
}: {
  thumbnailId: string;
  videoId: string;
}) {
  return axios.patch<Video>(`${thumbnailBase}/${thumbnailId}`, payload, {
    withCredentials: true,
  });
}

export function getThumbnail(thumbnailId: string) {
  return axios.get(`${thumbnailBase}/${thumbnailId}`).then((res) => res.data);
}
