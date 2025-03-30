import { getById } from "@/api/utils";
import myToast from "@/components/MyToast";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { baseUrl } from "@/firebase";
import { Post, PostWithUser, User } from "@/types/posts";
import axios from "axios";
import { RotateCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import NotFoundPage from "./404-NotFound";
import SinglePostCard from "@/components/SinglePostCard";
import AddComment from "@/components/AddComment";
import PageHeader from "@/components/PageHeader";

const SinglePost = () => {
  const [post, setPost] = useState<Post | undefined>();
  const [author, setAuthor] = useState<User | undefined>();
  const [dialogIsShown, setDialogIsShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const authToken = localStorage.getItem("authToken");
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  console.log("author", author);

  const navigate = useNavigate();

  const { id } = useParams();

  // console.log("post", post);

  const fetchUser = async () => {
    if (!authToken) {
      return;
    }

    try {
      const { data } = await axios.get(`${baseUrl}/users/account`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      const userData: User = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        active: data.active,
        posts: data.posts,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      setUser(userData);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const fetchPost = async () => {
    try {
      const postData = await getById<Post>("posts", Number(id));

      const author = await axios.get(
        `${baseUrl}/users/${postData?.user_id ? postData.user_id : 0}`
      );

      // const authorData = await getById<User>(
      //   "users",
      //   postData?.user_id ? Number(postData.user_id) : 0
      // );

      if (!postData) {
        throw new Error("Post not found");
      }
      // // const postData = await getById(`posts`, Number(id));

      if (!postData) {
        return;
      }

      setPost(postData);
      // setAuthor(authorData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("post", post);

  // const fetchAuthor = async () => {
  //   try {
  //     if (!post?.user_id) {
  //       return;
  //     }
  //     const authorData = await axios.get(`${baseUrl}/users/${post?.user_id}`);
  //     console.log("authorData", authorData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchPost();
    window.scrollTo({ top: 0 });
  }, []);

  // useEffect(() => {
  //   fetchAuthor();
  // }, [post]);

  // useEffect(() => {
  //   if (post?.user_id === user?.id) {
  //     setIsAuthor(true);
  //   }
  // }, [post, user]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${baseUrl}/posts/${id}`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      if (res.status === 200) {
        myToast("Post deleted successfully");
      }
      navigate("/");

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  setTimeout(() => {
    setPostLoading(false);
    // if (post?.user_id === user?.id) {
    //   setIsAuthor(true);
    // }
  }, 500);

  if (!post && !postLoading) {
    return <NotFoundPage content="Couldn't find that post" />;
  }

  return (
    <main className="flex px-0 flex-col items-center gap-5">
      <section className=" w-full">
        <PageHeader title={`Post by ${author?.firstName ?? "Unknown User"}`} />
        {postLoading ? (
          <RotateCw className="animate-spin w-7 h-7 justify-self-center mt-32 self-center" />
        ) : (
          post && <SinglePostCard post={post} author={author} />
        )}
        <AddComment />
      </section>
      {isAuthor ? (
        <Dialog>
          {post?.user_id === user?.id && (
            <DialogTrigger asChild>
              <Button variant="secondary" className="">
                Delete post
              </Button>
            </DialogTrigger>
          )}
          <DialogContent className="flex-col flex w-2/3 items-center">
            <DialogTitle>
              <h3>Are you sure?</h3>
            </DialogTitle>
            <Button className="bg-accent-alt py-5 mt-2" onClick={handleDelete}>
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <div>Nothing</div>
      )}
    </main>
  );
};

export default SinglePost;
