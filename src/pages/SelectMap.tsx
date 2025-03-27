import { postSchema, PostSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const SelectMap = () => {
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      longitude: 0,
      latitude: 0,
    },
  });

  return <form></form>;
};

export default SelectMap;
