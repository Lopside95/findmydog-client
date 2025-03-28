import { baseUrl, uploadPhoto } from "@/api/utils";
import MapComponent from "@/components/Map";
import { Button } from "@/components/ui/button";
import { UserMarker } from "@/types/posts";
import { postSchema, PostSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

const StepTwo = () => {
  const { control, getFieldState, getValues } = useFormContext<PostSchema>();
  const [userMarkers, setUserMarkers] = useState<UserMarker[]>([]);
  const [vals, setVals] = useState<Partial<PostSchema> | undefined>();

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const location = useLocation();

  const formVals = location.state?.formVals as Partial<PostSchema>;
  const file = location.state?.file as File | null;

  useEffect(() => {
    if (formVals) {
      setVals(formVals);
    }
  });

  const theValues = getValues();

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: formVals.title,
      description: formVals.description,
      tags: formVals.tags,
      status: formVals.status,
      img: "",
      // img: formVals.img,
      urgency: formVals.urgency,
      longitude: 0,
      latitude: 0,
    },
  });

  // "There was an error creating this postError: insert into `posts` (`description`, `img`, `latitude`, `longitude`, `status`, `title`, `type`, `urgency`, `user_id`) values ('dasDASdads', 'https://storage.googleapis.com/find-my-dog/greyhound.jpg', 0, 0, DEFAULT, 'aSDasaSD', DEFAULT, 3, 2) - Unknown column 'type' in 'field list'"

  const onSubmit: SubmitHandler<PostSchema> = async (data: PostSchema) => {
    if (file !== null) {
      const url = await uploadPhoto(
        file,
        `/images/${formVals.userId}/${formVals.title}/${file.name}`
      );

      data.img = url;
    }
    // if (file !== null) {
    //   const url = await uploadPhoto(
    //     file,
    //     `/images/${shelterId}/${animalName}/${file.name}`
    //   );

    //   data.img = url;

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

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("errors", errors);
  }, [form.formState.errors]);

  if (!formVals) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...form}>
      <form
        className="px-xdf flex flex-col items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="self-start">Step Two</h2>
        <div className="w-full h-[1px] bg-accent mt-2 "></div>
        <h3 className="self-start my-5">Choose a location on the map</h3>
        <MapComponent
          userMarkers={userMarkers}
          setUserMarkers={setUserMarkers}
        />

        <Button
          className={`py-[1.4rem]  "mt-4"}`}
          // className={`py-[1.4rem] ${file !== null ? "mt-40" : "mt-4"}`}
          type="submit"
        >
          Done
        </Button>
      </form>
    </FormProvider>
  );
};

export default StepTwo;
