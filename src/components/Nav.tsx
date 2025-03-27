import { useState } from "react";
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
const Nav = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
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

  return (
    <Sheet open={isShown} onOpenChange={setIsShown}>
      <SheetTrigger className="absolute top-4 right-4 z-50 sm:hidden">
        <Menu className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent className="w-[380px] sm:w-[540px] bg-[#F37657] border-none ">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader> */}
        <div className="flex flex-col gap-4 px-6 py-4 font-semibold ">
          <h2 onClick={() => handleNavigate("/")}>Home</h2>
          <h2 onClick={() => handleNavigate("/users/signup")}>
            Create Profile
          </h2>
          <h2 onClick={() => handleNavigate("/posts/create-post")}>New Post</h2>
          <h2 onClick={() => handleNavigate("/users/signin")}>Sign In</h2>
          <h2 onClick={() => handleNavigate("/users/account")}>Profile</h2>
          <h2 onClick={handleSignOut}>Sign Out</h2>
          <Dialog>
            <DialogTrigger asChild>
              <h2>Delete Account</h2>
              {/* <Button
                className="py-[1.4rem]"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setDialogIsShown(true);
                }}
              >
                Delete Account
              </Button> */}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This is irrevirsible and will delete your account permanently.
                  (Not functional yet)
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
