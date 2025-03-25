import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Home, User } from "lucide-react";

const BottomNav = () => {
  // const userIcon =

  return (
    <div className="flex fixed bottom-0 h-12 w-full bg-my-secondary items-center justify-between px-10">
      <Home className="w-8 h-8" />
      <Avatar>
        <AvatarImage src="/public/athena.svg" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default BottomNav;
