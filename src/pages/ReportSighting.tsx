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
      // img: "https://storage.googleapis.com/find-my-dog/greyhound.jpg",
      urgency: 3,
      // longitude: 0,
      // latitude: 0,
      userId: user?.id,
    },
  });

  // const newPhoto = URL.createObjectURL(acceptedFiles[0]);

  // setPhoto(newPhoto);
  const status = form.watch("status");

  const onSubmit: SubmitHandler<PostSchema> = async (data: PostSchema) => {
    try {
      form.setValue("userId", user?.id);
      form.setValue("status", status);
      form.setValue("img", file ? URL.createObjectURL(file) : "");
      form.setValue("longitude", 0);
      form.setValue("latitude", 0);
      form.setValue("tags", data.tags);

      // Object.entries(data).forEach(([key, value]) => {
      //   form.setValue(key as keyof PostSchema, value);
      // });

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

  const tagOptions = allTags?.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("errors", errors);
  }, [form.formState.errors]);

  useEffect(() => {
    if (!isLoggedIn) {
      setToastShown(true);
    }
  }, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex flex-col">
          <PageHeader title="Step one" />
          <article className="flex flex-col gap-5">
            <TextField name="title" label="Title" />
            <TextField name="description" label="Description" />
            <>
              <div className="flex justify-between">
                <FormLabel className="text-2xl my-0 py-0">Tags</FormLabel>
                <div className="mr-4">
                  <Button
                    className={`rounded-none h-9 mr-0.5 w-14 py-0 ${
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
                    className={`rounded-none h-9 w-14 py-0 ${
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
                </div>
              </div>
              <TagsInput tags={allTags || []} />
            </>
            {/* <TextField name="tags" label="Tags" /> */}
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
          <article className="flex flex-col gap-5 pt-5 max-h-[400px] ">
            <FormLabel className="text-2xl">Upload a picture</FormLabel>
            <ImageUpload file={file || undefined} setFile={setFile} />
            {/* <div className="w-full h-[130px] bg-secondary flex items-center justify-center">
              <Input type="file" />
              <Plus className="w-8 h-8 text-accent" />
            </div> */}
          </article>
          <Button
            type="submit"
            className="mx-auto my-5 py-[1.4rem] z-20"
            // className={`py-[1.4rem] mx-auto ${
            //   file !== null ? "mt-40" : "mt-4"
            // }`}
          >
            Next
          </Button>
          {/* <Button className="mx-auto my-5 py-[1.4rem]">Next</Button> */}
        </section>
      </form>
    </FormProvider>
  );
};

export default ReportSighting;
