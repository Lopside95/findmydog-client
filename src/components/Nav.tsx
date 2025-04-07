import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { User } from "@/types/posts";
import axios from "axios";
import { baseUrl } from "@/api/utils";
import { deleteUser } from "@/api/users";
const Nav = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const [user, setUser] = useState<User | null>(null);
  const [dialogIsShown, setDialogIsShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(true);

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
  }, []);

  const [isShown, setIsShown] = useState<boolean>(false);
  const [desktopIsShown, setDesktopIsShown] = useState<boolean>(false);

  const [pageHeader, setPageHeader] = useState<string>("");

  const handleSignOut = async () => {
    localStorage.removeItem("authToken");
    await navigate(`/`);
    setIsShown(false);
    // setDesktopIsShown(false);
  };

  const location = useLocation();

  const handleNavigate = async (path: string) => {
    navigate(path);
    setIsShown(false);
    // setDesktopIsShown(false);
  };

  // const handleDelete = async () => {
  //   try {
  //     if (!user) {
  //       console.log("No user found");
  //       return;
  //     }

  //     const res = await deleteUser(user?.email);

  //     if (res?.status === 200) {
  //       localStorage.removeItem("authToken");
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const authStyle = authToken ? "hidden" : "";

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

  return (
    <Sheet open={isShown} onOpenChange={setIsShown}>
      <SheetTrigger className="absolute top-4 right-4 z-50 ">
        <Menu className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent className=" w-64 sm:w-[540px] bg-[#F37657] border-none ">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-6 py-4 font-semibold ">
          <h2 className="cursor-pointer" onClick={() => handleNavigate("/")}>
            Home
          </h2>
          <h2
            className={`${authToken && "hidden"} cursor-pointer`}
            onClick={() => handleNavigate("/users/signup")}
          >
            Create Profile
          </h2>
          <h2 onClick={() => handleNavigate("/posts/create-post")}>New Post</h2>
          <h2
            className={`${authToken && "hidden"} cursor-pointer`}
            onClick={() => handleNavigate("/users/signin")}
          >
            Sign In
          </h2>
          <h2 className={`${!authToken && "hidden"}`} onClick={handleSignOut}>
            Sign Out
          </h2>
          <h2
            className={`${!authToken && "hidden"} cursor-pointer`}
            onClick={() => handleNavigate("/users/account")}
          >
            Profile
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <h2 className="absolute text-[1rem] bottom-5 right-5 cursor-pointer">
                Delete Account
              </h2>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  <Button className="bg-accent-alt">Delete account</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Nav;
