import { baseUrl } from "@/api/utils";
import { User } from "@/types/posts";
import { commentSchema, CommentSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import TextField from "./TextField";

const AddComment = () => {
  const [user, setUser] = useState<User>();

  const { id } = useParams();

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const fetchData = async () => {
    if (!authToken) {
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/account`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );

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

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      post_id: id,
      content: "",
    },
  });

  const onSubmit: SubmitHandler<CommentSchema> = async (
    data: CommentSchema
  ) => {
    try {
      const res = await axios.post(`${baseUrl}/posts/${id}`, data, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      //   toaster.success("Comment added");

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <Button onClick={() => navigate("/users/signin")} className="mx-auto">
        Sign In
      </Button>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        className="mt-0 pt-5 flex flex-col items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {!user ? (
          <h4>
            {" "}
            <span onClick={() => navigate("/users/login")}>Log in</span> to
            comment
          </h4>
        ) : null}
        <TextField label="Add comment" name="content" />
        <Button className="my-2">Add</Button>
      </form>
    </FormProvider>
  );
};

export default AddComment;
