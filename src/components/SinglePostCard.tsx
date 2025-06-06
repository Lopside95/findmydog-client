import { Post, PostWithUser, User, UserMarker } from "@/types/posts";
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
import MapComponent from "./Map";
import StillMap from "./StillMap";
import { Button } from "./ui/button";
import { useRef } from "react";
import { Map, MapMouseEvent, IControl } from "mapbox-gl";
import { useLocation } from "react-router";

interface SinglePostCardProps {
  post: Post;
  author?: User | null;
}
const SinglePostCard = ({ post, author }: SinglePostCardProps) => {
  //   const user = {
  //     firstName: post.first_name,
  //     lastName: post.last_name,
  //     email: post.email,
  //   };

  const location = useLocation();

  const updatedAt = formatDateShort(new Date(post.updated_at));

  const status = post.status.toString().toLocaleLowerCase();

  const markers: UserMarker = {
    lng: post.longitude,
    lat: post.latitude,
  };

  const mapRef = useRef<{ resetMap: () => void } | null>(null);

  //   const handleToSinglePost = () => {
  //     if (location.pathname === "/") {
  //       window.location.href = `/posts/${post.id}`;
  //     }
  //   };

  const handleReset = () => {
    if (mapRef.current) {
      mapRef.current.resetMap();
    }
  };

  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex gap-3">
            <MyAvatar src="" alt="User Avatar">
              <UserIcon />
            </MyAvatar>
            <h5>
              {author?.firstName ?? "Unknown"} {author?.lastName ?? "User"}
              {/* {author?.firstName} {author?.lastName} */}
            </h5>
          </div>
          <Badge className="bg-secondary-alt h-5 text-primary">
            {updatedAt}
          </Badge>
        </CardTitle>
        <CardDescription className="px-0">{post.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-[90%] self-center pb-5">
          <CarouselContent className=" w-[88%]  ">
            <CarouselItem className="rounded-xl w-40 h-52 snap-start overflow-hidden bg-accent mx-4 p-0">
              <img
                src={post.img ?? "/images/dog-404.png"}
                alt="Post Image"
                className=" object-cover w-full h-full"
                // onClick={handleToSinglePost}
                // className="w-52 rounded-md h-40 object-cover "
              />
            </CarouselItem>
            <CarouselItem className="w-40 h-52 p-0 snap-start -mr-14 rounded-xl object-cover relative">
              {/* <StillMap
                ref={mapRef}
                lng={post.longitude ?? 0}
                lat={post.latitude ?? 0}
              /> */}
              <Button
                onClick={handleReset}
                variant="secondary"
                className=" absolute bottom-0 left-0 text-xs rounded-none px-1 z-50 h-5"
              >
                Reset
              </Button>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <Badge className="ml-1">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <p className="text-sm pl-2 pt-2 font-light font-inter w-4/5 leading-tight">
          {post.description}
        </p>
      </CardContent>
      <CardFooter className="flex-col flex items-start">
        <div className="flex items-center gap-2 mt-2">
          <MyAvatar src="" alt="User Avatar">
            <UserIcon />
          </MyAvatar>
          {post.comments?.length > 1
            ? post.comments.length + " comments"
            : "1 comment"}
          {/* {post.comments?.length} comments */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SinglePostCard;
