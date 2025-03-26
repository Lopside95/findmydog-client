import { Post, PostWithUser, User } from "@/types/posts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { UserIcon } from "lucide-react";
import MyAvatar from "./MyAvatar";
import { Badge } from "./ui/badge";
import { formatDateShort } from "@/utils/helpers";

interface PostCardProps {
  post: PostWithUser;
}

const PostCard = ({ post }: PostCardProps) => {
  const user = {
    firstName: post.first_name,
    lastName: post.last_name,
    email: post.email,
  };

  const updatedAt = formatDateShort(new Date(post.updated_at));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <MyAvatar src="" alt="User Avatar">
            <UserIcon />
          </MyAvatar>
          <h5>{user.firstName}</h5>
          <Badge className="bg-secondary-alt text-primary">{updatedAt}</Badge>
        </CardTitle>
      </CardHeader>
      <CardDescription>{post.title}</CardDescription>
      <CardContent>Image</CardContent>
      <CardFooter>5 comments</CardFooter>
    </Card>
  );
};

export default PostCard;
