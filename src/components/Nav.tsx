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

const Nav = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const [isShown, setIsShown] = useState<boolean>(false);
  const [desktopIsShown, setDesktopIsShown] = useState<boolean>(false);

  const [pageHeader, setPageHeader] = useState<string>("");

  const handleLogOut = async () => {
    localStorage.removeItem("authToken");
    await navigate(`/`);
    setIsShown(false);
    setDesktopIsShown(false);
  };

  const location = useLocation();

  const handleNavigate = async (path: string) => {
    navigate(path);
    setIsShown(false);
    // setDesktopIsShown(false);
  };

  return (
    <Sheet open={isShown} onOpenChange={setIsShown}>
      <SheetTrigger className="absolute top-4 right-4 z-50 sm:hidden">
        <Menu className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-[#F37657] border-none ">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
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
          <h2 onClick={() => handleNavigate("/users/login")}>Sign In</h2>
          <h2 onClick={() => handleNavigate("/users/account")}>Profile</h2>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Nav;
