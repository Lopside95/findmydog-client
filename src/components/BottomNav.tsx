import { useNavigate } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Home, User } from "lucide-react";
import MyAvatar from "./MyAvatar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useState } from "react";

const BottomNav = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const handleAccNav = () => {
  //   if (authToken) {
  //     navigate("/users/account");
  //   } else {
  //     if (isOpen) {
  //       setIsOpen(false);
  //     }
  //     setIsOpen(true);
  //   }
  // };

  const handleAccNav = () => {
    if (authToken) {
      navigate("/users/account");
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex fixed bottom-0 h-14 w-full bg-secondary items-center justify-between px-10">
      <Home className="w-8 h-8" onClick={() => navigate("/")} />

      {/* <MyAvatar src="/athena.svg" alt="User Avatar" onClick={handleAccNav}>
        <User />
      </MyAvatar> */}
      <Popover open={isOpen}>
        <PopoverTrigger onClick={handleAccNav}>
          <MyAvatar src="/athena.svg" alt="User Avatar">
            <User />
          </MyAvatar>
        </PopoverTrigger>
        <PopoverContent className="w-28">
          <p onClick={() => navigate("/users/signup")}>Sign Up</p>
          <p onClick={() => navigate("/users/signin")}>Sign In</p>
        </PopoverContent>
      </Popover>

      {/* <Popover open={isOpen}>
        <PopoverTrigger onClick={handleAccNav}>
        </PopoverTrigger>
        <PopoverContent className="w-32">
        </PopoverContent>
      </Popover> */}

      {/* <Avatar
        onClick={() =>
          authToken ? navigate("/users/account") : navigate("/users/signin")
        }
      >
        <AvatarImage src="/athena.svg" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar> */}
    </div>
  );
};

export default BottomNav;
