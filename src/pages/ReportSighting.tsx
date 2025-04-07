import TextField from "@/components/TextField";
import { Separator } from "@/components/ui/separator";
import { postSchema, PostSchema, PostStatus, Tag } from "@/types/schemas";
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
import PageHeader from "@/components/PageHeader";
import ImageUpload from "@/components/ImageUpload";
import TagsInput from "@/components/TagsInput";

const ReportSighting = () => {
  const [allTags, setAllTags] = useState<Tag[]>();
  const [userMarkers, setUserMarkers] = useState<UserMarker[]>([]);
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [postStatus, setPostStatus] = useState<PostStatus>();
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
      status: "FOUND",
      urgency: 3,
      userId: user?.id,
    },
  });

  const status = form.watch("status");

  const onSubmit: SubmitHandler<PostSchema> = async (data: PostSchema) => {
    try {
      form.setValue("userId", user?.id);
      form.setValue("status", status);
      form.setValue("img", file ? URL.createObjectURL(file) : "");
      form.setValue("longitude", 0);
      form.setValue("latitude", 0);
      form.setValue("tags", data.tags);

      const formVals = form.getValues();
      console.log("formVals", formVals);

      navigate("/posts/create-post/step-two", {
        state: {
          formVals,
          file,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setToastShown(true);
    }
  }, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex flex-col md:w-3/4 md:mx-auto">
          <PageHeader title="Step one" />
          <article className="flex flex-col gap-5">
            <TextField name="title" label="Title" />
            <TextField name="description" label="Description" />
            <>
              <div className="flex justify-between">
                <FormLabel className="text-2xl my-0 py-0">Tags</FormLabel>
                {/* <div className="mr-4">
                  <Button
                    className={`rounded-none z-20 h-9 mr-0.5 w-14 py-0 ${
                      status === "FOUND" && "bg-accent"
                    } `}
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      form.setValue("status", "FOUND");
                    }}
                  >
                    Found
                  </Button> 
                  <Button
                    className={`rounded-none z-20 h-9 w-14 py-0 ${
                      status === "MISSING" && "bg-accent"
                    } `}
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      form.setValue("status", "MISSING");
                    }}
                  >
                    Missing
                  </Button>
                </div> */}
              </div>
              <TagsInput tags={allTags || []} />
            </>
          </article>
          <article className="flex flex-col gap-5 pt-5 max-h-[400px] ">
            <FormLabel className="text-2xl">Upload a picture</FormLabel>
            <ImageUpload file={file || undefined} setFile={setFile} />
          </article>
          <Button type="submit" className="mx-auto my-5 py-[1.4rem] z-20">
            Next
          </Button>
        </section>
      </form>
    </FormProvider>
  );
};

export default ReportSighting;
