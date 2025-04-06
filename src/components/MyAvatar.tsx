import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps extends React.ComponentProps<typeof Avatar> {
  src: string;
  alt: string;
  cn?: string;
}

const MyAvatar: React.FC<AvatarProps> = ({
  children,
  src,
  alt,
  cn,
  ...props
}) => {
  return (
    <Avatar>
      <AvatarImage className={cn} src={src} alt={alt} />
      <AvatarFallback className={`cursor-pointer ${cn}`}>
        {children}
      </AvatarFallback>
    </Avatar>
  );
};

export default MyAvatar;
