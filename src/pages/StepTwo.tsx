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
import NotFoundPage from "./404-NotFound";

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

  const formStatus = formVals?.status;

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: formVals.title,
      description: formVals.description,
      tags: formVals.tags,
      img: "",
      urgency: formVals.urgency,
      longitude: 0,
      latitude: 0,
    },
  });

  useEffect(() => {
    form.setValue("status", formStatus ? formStatus : "FOUND");
  }, [formStatus]);

  const onSubmit: SubmitHandler<PostSchema> = async (data: PostSchema) => {
    if (file !== null) {
      const url = await uploadPhoto(
        file,
        `/findmydog/${formVals.title}/${file.name}`
      );

      data.img = url;
    }

    try {
      const res = await axios.post(`${baseUrl}/posts`, data, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      if (res.data.id) {
        navigate(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const errors = form.formState.errors;

  useEffect(() => {
    if (userMarkers.length) {
      form.setValue("latitude", userMarkers[0].lat);
      form.setValue("longitude", userMarkers[0].lng);
    }
  }, [userMarkers]);

  if (!formVals) {
    return <NotFoundPage content="Something went wrong. Please try again." />;
  }

  return (
    <FormProvider {...form}>
      <form
        className="px-xdf flex flex-col  md:w-3/4 lg:w-3/5 md:mx-auto items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="self-start">Step Two</h2>
        <div className="w-full h-[1px] bg-accent mt-2 "></div>
        <h3 className="self-start my-5">Choose a location on the map</h3>
        <MapComponent
          userMarkers={userMarkers}
          setUserMarkers={setUserMarkers}
        />
        <Button className={`mt-4`} type="submit">
          Done
        </Button>
      </form>
    </FormProvider>
  );
};

export default StepTwo;
