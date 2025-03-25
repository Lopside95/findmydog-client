import axios from "axios";
import { PostSchema } from "@/types/schemas";
import { Post } from "@/types/posts";
import { baseUrl } from "./main";

export const getPosts = async () => {
  try {
    const res = await axios.get<Post[]>(`${baseUrl}/posts`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
