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
import { MessageCircle, UserIcon } from "lucide-react";
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
import { useLocation, useNavigate } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import TextField from "./TextField";
import myToast from "./MyToast";
import axios from "axios";
import { baseUrl } from "@/api/utils";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { commentSchema, CommentSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface PostCardProps {
  post: PostWithUser;
  sessionUser?: User | null;
}

const PostCard = ({ post, sessionUser }: PostCardProps) => {
  const user = {
    firstName: post.first_name,
    lastName: post.last_name,
    email: post.email,
  };

  const authToken = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const location = useLocation();

  const updatedAt = formatDateShort(new Date(post.updated_at));

  const status = post.status.toString().toLocaleLowerCase();

  const markers: UserMarker = {
    lng: post.longitude,
    lat: post.latitude,
  };

  const comments = post.comments;

  const handleAddComment = async () => {
    if (!sessionUser?.id) {
      myToast("You need to be logged to comment");
    } else {
      const res = await axios.post(`${baseUrl}/posts/${post.id}/comments`);

      console.log("res", res);

      return res;
    }
  };

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      //  post_id: id,
      content: "",
    },
  });

  const onSubmit: SubmitHandler<CommentSchema> = async (
    data: CommentSchema
  ) => {
    try {
      const res = await axios.post(`${baseUrl}/posts/${post.id}`, data, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const mapRef = useRef<{ resetMap: () => void } | null>(null);

  // const handleToSinglePost = () => {
  //   // if (location.pathname === "/") {
  //   //   window.location.href = `/posts/${post.id}`;
  //   // }
  //   navigate(`posts/${post.id}`, {
  //     state: {
  //       post,
  //       user,
  //     },
  //   });
  // };

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
              {user.firstName} {user.lastName}
            </h5>
          </div>
          <Badge className="bg-secondary-alt h-5 text-primary">
            {updatedAt}
          </Badge>
        </CardTitle>
        <CardDescription>{post.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-[90%] self-center pb-5">
          <CarouselContent className=" w-[88%]  ">
            <CarouselItem className="rounded-xl w-40 h-52 snap-start overflow-hidden bg-accent mx-4 p-0">
              <img
                src={post.img ?? "/images/dog-404.png"}
                alt="Post Image"
                className="object-cover w-full h-full"
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
        {post.tags?.map((tag) => {
          return (
            <Badge
              key={tag.id}
              className="bg-secondary-alt h-5 text-primary my-1"
            >
              {tag.name}
            </Badge>
          );
        })}
        {/* <Badge className="ml-1">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge> */}
        <p className="text-sm pl-2 pt-2 font-light font-inter w-4/5 leading-tight">
          {post.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 mt-2">
          {/* <MyAvatar src="" alt="User Avatar">
            <UserIcon className="w-4" />
          </MyAvatar> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              {comments?.length ? (
                <AccordionTrigger>
                  <p className="">
                    {post.comments?.length > 1
                      ? post.comments?.length + " comments"
                      : post.comments?.length === 1
                      ? "1 comment"
                      : "No comments"}
                  </p>
                </AccordionTrigger>
              ) : (
                // <div className="flex items-center w-full justify-between">
                <p className="">No comments</p>
                // <MessageCircle className="" />
                // </div>
              )}
              <AccordionContent>
                {comments?.map((comment) => (
                  <div className="flex items-center" key={comment.id}>
                    <MyAvatar cn="w-4 h-4" src="" alt="User Avatar">
                      <UserIcon className="w-4 h-4" />
                    </MyAvatar>
                    <p className="text-[1rem]">{comment.content}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <p className="text-sm">
            {post.comments?.length > 1
              ? post.comments?.length + " comments"
              : post.comments?.length === 1
              ? "1 comment"
              : "No comments"}
          </p> */}
          {/* {post.comments?.length > 1
            ? post.comments.length + " comments"
            : "1 comment"} */}
          {/* {post.comments?.length} comments */}
        </div>
        <Dialog>
          <DialogTrigger asChild className="">
            <MessageCircle onClick={handleAddComment} className="mr-5" />
          </DialogTrigger>
          <DialogContent className="rounded-none">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <FormProvider {...form}>
                <form
                  className="mt-0 pt-5 flex flex-col items-center"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <TextField label="Add comment" name="content" />
                  <DialogDescription>
                    {!authToken ? (
                      <h4>
                        {" "}
                        <span onClick={() => navigate("/users/login")}>
                          Log in
                        </span>{" "}
                        to comment
                      </h4>
                    ) : (
                      <Button type="submit" className="bg-accent-alt py-5 mt-4">
                        Done
                      </Button>
                    )}
                  </DialogDescription>
                </form>
              </FormProvider>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* <MessageCircle className="self-end w-6 h-6 mr-5 -mt-6" /> */}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
