import { useLocation, useNavigate } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, ChevronDown, ChevronLeft, Home, User } from "lucide-react";
import MyAvatar from "./MyAvatar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useState, useEffect, useRef } from "react";

const BottomNav = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const location = useLocation();

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleHomeScroll = () => {
    if (location.pathname === "/") {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      scrollToTop();
    } else {
      navigate("/");
    }
  };

  const handleAccNav = () => {
    if (authToken) {
      navigate("/users/account");
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex fixed bottom-0 h-[3.3rem] w-full   z-40 items-center border-t-1 bg-accent border-accent justify-between px-12 ">
      <h4 className="cursor-pointer" onClick={handleHomeScroll}>
        Home
      </h4>
      {/* <Home className="w-6 h-6 cursor-pointer" onClick={handleHomeScroll} /> */}
      <ChevronLeft
        className="w-8 h-8 ml-5 stroke-1"
        onClick={() => navigate(-1)}
      />
      <Popover open={isOpen}>
        <PopoverTrigger onClick={handleAccNav}>
          <h4 className="cursor-pointer">Account</h4>
          {/* <User className="bg-accent " /> */}
        </PopoverTrigger>
        <PopoverContent
          ref={popoverRef}
          className="w-screen shadow-none  h-14 flex justify-around  border-none rounded-none bg-accent  -mb-12"
        >
          <ChevronDown
            className="w-8 h-8 stroke-1 -mt-1 font-light cursor-pointer "
            onClick={() => setIsOpen(false)}
          />
          {/* <ArrowLeft className="w-6 h-6 cursor-pointer " /> */}
          {/* <div className="flex gap-5 items-center pr-4"> */}
          <p
            className="-mt-1 cursor-pointer"
            onClick={() => {
              navigate("/users/signup");
              setIsOpen(false);
            }}
          >
            Sign Up
          </p>
          <p
            className="-mt-1 -mr-5 cursor-pointer"
            onClick={() => {
              navigate("/users/signin");
              setIsOpen(false);
            }}
          >
            Sign In
          </p>
          {/* </div> */}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BottomNav;
