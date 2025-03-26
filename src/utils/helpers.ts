import { PostWithUser } from "@/types/posts";

export const formatDateShort = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "short",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  };
  return new Intl.DateTimeFormat("en-UK", options).format(date);
};

export const postWithUserPayload = (post: PostWithUser) => {
  return {
    id: post.id,
    firstName: post.first_name,
    lastName: post.last_name,
    tags: post.tags,
    title: post.title,
    description: post.description,
    urgency: post.urgency,
    type: post.type,
    status: post.status,
    comments: post.comments,
    longitude: post.longitude,
    latitude: post.latitude,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    email: post.email,
  };
};
