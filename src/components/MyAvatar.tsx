import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps extends React.ComponentProps<typeof Avatar> {
  src: string;
  alt: string;
}

const MyAvatar: React.FC<AvatarProps> = ({ children, src, alt, ...props }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
};

export default MyAvatar;
