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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

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
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex gap-3">
            <MyAvatar src="" alt="User Avatar">
              <UserIcon />
            </MyAvatar>
            <h5>{user.firstName}</h5>
          </div>
          <Badge className="bg-secondary-alt h-5 text-primary">
            {updatedAt}
          </Badge>
        </CardTitle>
        <CardDescription>{post.title}</CardDescription>
      </CardHeader>

      <Carousel className="w-[80%] self-center">
        <CarouselContent className=" w-4/5  ">
          <CarouselItem className="rounded-xl w-40 h-40 snap-start overflow-hidden bg-accent mx-5 p-0">
            <img
              src={post.img ?? "/images/dog-404.png"}
              alt="Post Image"
              className=" object-cover w-full h-full"
              // className="w-52 rounded-md h-40 object-cover "
            />
          </CarouselItem>
          <CarouselItem className="bg-accent-alt w-40 h-40 p-0 snap-start -mr-14 rounded-xl">
            Map
          </CarouselItem>
          {/* <CarouselItem>...</CarouselItem> */}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>

      <CardFooter>
        <MyAvatar src="" alt="User Avatar">
          <UserIcon />
        </MyAvatar>
        {post.comments?.length} comments
      </CardFooter>
    </Card>
  );
};

export default PostCard;
