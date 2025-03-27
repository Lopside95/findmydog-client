import { login } from "@/api/users";
import PasswordInput from "@/components/PasswordInput";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   console.log("Form Errors:", form.formState.errors);
  // }, [form.formState]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    try {
      const res = await login(data);
      if (res?.status !== 200) {
        toast("Invalid email or password");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex-col flex items-center gap-5">
          <TextField label="Email" name="email" placeholder="your@email.com" />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Password"
          />
          <Button variant="primary" className="py-[1.4rem]">
            Log In
          </Button>
          {/* <br />
          <Button
            variant="primary"
            className="py-[1.4rem]"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              navigate("/users/signup");
            }}
          >
            Sign Up
          </Button> */}
        </section>
      </form>
    </FormProvider>
  );
};

export default SignIn;
