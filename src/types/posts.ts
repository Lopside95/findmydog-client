import { SetStateAction } from "react";
import { PostStatus, PostType } from "./schemas";

export type Tag = {
  id: string;
  name: string;
};

export interface PostInterface {
  post?: Post;
}

export interface CardInterface {
  post: Post;
  onClick: Event;
}

export type Post = {
  id: string;
  title: string;
  img?: string;
  description: string;
  urgency: number;
  type: PostType;
  status: PostStatus;
  tags: Tag[];
  comments: UserComment[];
  longitude?: number;
  latitude?: number;
  created_at: Date;
  updated_at: Date;
  user_id?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  posts: Post[];
  created_at: Date;
  updated_at: Date;
};

export type UserComment = {
  id: string;
  content: string;
  postId: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
};

export type UserMarker = {
  lng?: number;
  lat?: number;
};

export interface MyMap {
  userMarkers: UserMarker[] | null;
  setUserMarkers: React.Dispatch<SetStateAction<UserMarker[]>>;
}
