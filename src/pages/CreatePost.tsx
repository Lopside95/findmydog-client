import TextField from "@/components/TextField";
import { Separator } from "@/components/ui/separator";
import { postSchema, PostSchema, Tag } from "@/types/schemas";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "@/api/main";
import { User, UserMarker } from "@/types/posts";
import { useNavigate } from "react-router";
import { getAll } from "@/api/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapComponent from "@/components/Map";

const CreatePost = () => {
  const [allTags, setAllTags] = useState<Tag[]>();
  const [userMarkers, setUserMarkers] = useState<UserMarker[]>([]);
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false);

  const authToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!authToken) {
      return;
    }

    try {
      const { data } = await axios.get(`${baseUrl}/posts`, {
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
      setIsLoggedIn(true);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getAll<Tag[]>("tags");

      setAllTags(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchData();
    window.scrollTo({ top: 0 });
    form.setFocus("title");
  }, []);

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      tags: [],
      status: "MISSING",
      img: "https://storage.googleapis.com/find-my-dog/greyhound.jpg",
      urgency: 3,
      longitude: 0,
      latitude: 0,
      userId: user?.id,
    },
  });

  useEffect(() => {
    if (userMarkers.length) {
      form.setValue("latitude", userMarkers[0].lat);
      form.setValue("longitude", userMarkers[0].lng);
    }
  }, [userMarkers]);

  const onSubmit: SubmitHandler<PostSchema> = async (data: PostSchema) => {
    try {
      const res = await axios.post(`${baseUrl}/posts`, data, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      if (res.data.id) {
        navigate(`/posts/${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tagOptions = allTags?.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("errors", errors);
  }, [form.formState.errors]);

  const { register, watch, formState } = form;

  useEffect(() => {
    if (!isLoggedIn) {
      setToastShown(true);
    }
  }, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main>
          <section className="flex flex-col">
            <h2>Step one</h2>
            <div className="w-full h-[1px] bg-accent my-5"></div>
            <article className="flex flex-col gap-5">
              <TextField name="title" label="Title" />
              <TextField name="description" label="Description" />
              <TextField name="tags" label="Tags" />
              {/* <Select>
                <SelectTrigger className="w-full border-none shadow-none focus:border-none focus:ring-0 focus:outline-none focus:shadow-none focus:none focus-visible:ring-0">
                  <SelectValue placeholder="Select Tags" />
                </SelectTrigger>
                <SelectContent>
                  {allTags?.map((tag) => (
                    <SelectItem key={tag.id} value={tag.name}>
                      {tag.name}
                    </SelectItem>
                  ))}
         
                </SelectContent>
              </Select> */}
            </article>
            <article className="flex flex-col gap-5 pt-5">
              <FormLabel className="text-2xl">Upload a picture</FormLabel>
              <div className="w-full h-[130px] bg-secondary flex items-center justify-center">
                <Plus className="w-8 h-8 text-accent" />
              </div>
            </article>
            <Button className="mx-auto my-5 py-[1.4rem]" variant="primary">
              Next
            </Button>
          </section>
          <section id="map" className="h-[30rem]">
            {/* <MapComponent /> */}
          </section>
        </main>
      </form>
    </FormProvider>
  );
};

export default CreatePost;
