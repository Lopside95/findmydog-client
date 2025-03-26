import { Post, PostWithUserDetails, User } from "@/types/posts";
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

interface PostCardProps {
  post: PostWithUserDetails;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Avatar>
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription>{post.first_name}</CardDescription>
      </CardHeader>
      <CardContent>Image</CardContent>
      <CardFooter>5 comments</CardFooter>
    </Card>
  );
};

export default PostCard;
