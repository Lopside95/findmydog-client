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

interface PostCardProps {
  post: PostWithUser;
}

const PostCard = ({ post }: PostCardProps) => {
  const user = {
    firstName: post.first_name,
    lastName: post.last_name,
    email: post.email,
  };

  console.log("post", post);

  const updatedAt = formatDateShort(new Date(post.updated_at));

  const status = post.status.toString().toLocaleLowerCase();

  const markers: UserMarker = {
    lng: post.longitude,
    lat: post.latitude,
  };

  const mapRef = useRef<{ resetMap: () => void } | null>(null);

  const handleReset = () => {
    if (mapRef.current) {
      mapRef.current.resetMap(); // Call the resetMap function in StillMap
    }
  };

  // const mapRef = useRef<Map | null>(null);
  // const resetMap = () => {
  //   console.log("markers", markers);

  //   console.log("mapRef.current", mapRef.current);

  //   if (markers.lng && markers.lat) {
  //     mapRef.current?.flyTo({
  //       center: [markers.lng, markers.lat],
  //       zoom: 12,
  //     });
  //   }
  // };

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
          <CarouselItem className="rounded-xl w-40 h-52 snap-start overflow-hidden bg-accent mx-5 p-0">
            <img
              src={post.img ?? "/images/dog-404.png"}
              alt="Post Image"
              className=" object-cover w-full h-full"
              // className="w-52 rounded-md h-40 object-cover "
            />
          </CarouselItem>
          <CarouselItem className=" w-40 h-52 p-0 snap-start -mr-14 rounded-xl object-cover relative">
            <StillMap
              ref={mapRef}
              lng={post.longitude ?? 0}
              lat={post.latitude ?? 0}
            />
            <Button
              // onReset={() => {
              //   console.log("Reset triggered from PostCard");
              // }}
              onClick={handleReset}
              variant="secondary"
              className=" absolute bottom-0 left-0 text-xs rounded-none px-1 z-50 h-5"
            >
              Reset
            </Button>
            {/* <p
              // variant="secondary"
              className=" absolute bottom-1 left-1 text-xs bg-secondary-alt px-1 rounded-xl"
            >
              Reset
            </p> */}
            {/* <MapComponent
              userMarkers={markers}
              setUserMarkers={setUserMarkers}
            /> */}
          </CarouselItem>
          {/* <CarouselItem>...</CarouselItem> */}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>

      <CardFooter className="flex-col flex items-start">
        <Badge>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>

        <div className="flex items-center gap-2 mt-2">
          <MyAvatar src="" alt="User Avatar">
            <UserIcon />
          </MyAvatar>
          {post.comments?.length} comments
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
