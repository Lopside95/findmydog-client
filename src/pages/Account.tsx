import { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { User } from "@/types/posts";
import axios from "axios";
import { baseUrl } from "@/api/utils";
import { updateUserSchema, UpdateUserSchema } from "@/types/schemas";
import { toast } from "sonner";
import NotFoundPage from "./404-NotFound";
import TextField from "@/components/TextField";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { deleteUser } from "@/api/users";
const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dialogIsShown, setDialogIsShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const authToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const fetchUser = async () => {
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

  useEffect(() => {
    fetchUser();
    window.scrollTo({ top: 0 });
  }, []);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      active: user?.active || true,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserSchema> = async (
    data: UpdateUserSchema
  ) => {
    try {
      const res = await axios.put(
        `${baseUrl}/users/account`,
        data,

        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast("User updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!user) {
        console.log("No user found");
        return;
      }

      const res = await deleteUser(user?.email);

      if (res?.status === 200) {
        localStorage.removeItem("authToken");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.setValue("firstName", user?.firstName || "");
    form.setValue("lastName", user?.lastName || "");
    form.setValue("email", user?.email || "");
    form.setValue("password", user?.password || "");
  }, [user]);

  setTimeout(() => {
    setUserLoading(false);
  }, 400);

  if (!user && !userLoading) {
    return <NotFoundPage content="Couldn't find that user" />;
  }

  return (
    <FormProvider {...form}>
      <form className="px-xdf" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField label="First name" name="firstName" />
        <TextField label="Last name" name="lastName" />
        <TextField label="Email" name="email" />
        <PasswordInput
          name="newPassword"
          label="New Password"
          placeholder="New Password"
        />
        <Button type="submit">Update Details</Button>
        <Dialog />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setDialogIsShown(true);
          }}
        >
          Delete Account
        </Button>
        <img src="/dog-2.svg" className="fixed bottom-12" />
      </form>
    </FormProvider>
  );
};

export default Account;
