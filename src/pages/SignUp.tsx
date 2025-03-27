import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { userSchema, UserSchema } from "@/types/schemas";
import TextField from "@/components/TextField";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { createUser } from "@/api/users";

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserSchema> = async (data: UserSchema) => {
    try {
      const res = await createUser(data);
      navigate("/users/login");
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FormProvider {...form}>
      <form className="px-xdf h-[500px]" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="firstName"
          label="First name"
          placeholder="First name"
        />
        <TextField name="lastName" label="Last name" placeholder="Last name" />
        <TextField name="email" label="Email" placeholder="your@email.com" />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
        />

        <Button className="py-[1.4rem] " variant="primary">
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
};

export default SignUp;
