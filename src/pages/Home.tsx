import { baseUrl, getAll } from "@/api/utils";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Post, PostWithUser, User } from "@/types/posts";
import { Tag } from "@/types/schemas";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostWithUser[]>();
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostWithUser[] | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const authToken = localStorage.getItem("authToken");
  const fetchData = async () => {
    const postsData = await getAll<PostWithUser[]>("posts");
    const tagsData = await getAll<Tag[]>("tags");

    setPosts(postsData);

    if (tagsData) {
      setTags(tagsData);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/users/account`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      const userData: User = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        active: data.active,
        posts: data.posts,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      setUser(userData);
    } catch (error: unknown) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUser();
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (selectedTags && selectedTags.length > 0) {
      const filtered = posts?.filter((post) =>
        selectedTags.every((selectedTag) =>
          post.tags.some((postTag) => Number(postTag.id) == selectedTag.id)
        )
      );
      setFilteredPosts(filtered || []);
    } else {
      setFilteredPosts(posts || []);
    }
  }, [posts, selectedTags]);

  return (
    <main className="">
      <section className="flex flex-col">
        <h1 className="w-64">
          We help people find lost dogs, and help stray dogs find homes
        </h1>
        <img
          src="/cover.svg"
          alt="landing illustration of a dog"
          className="w-80 self-end"
        />
        <ChevronDown
          onClick={() => {
            window.scrollTo({
              top: postsRef.current?.offsetTop,
              behavior: "smooth",
            });
          }}
          className="w-20 h-20 stroke-[0.5] mx-auto my-10"
        />
      </section>

      <section className="h-[26rem] flex w-full max-lg:flex-col bg-accent mx-0 justify-evenly items-center mb-5 px-0">
        <article className=" px-0 mx-0 gap-5 text-center">
          <h2 className="w-72 pb-3">
            Report the sighting of a lost or stray dog
          </h2>
          <Button
            className="bg-secondary "
            onClick={() => navigate("/posts/create-post")}
          >
            Report
          </Button>
        </article>
        <article className=" items-center gap-5 text-center">
          <h2 className="w-72 pb-3">Find a lost dog</h2>
          <Button
            onClick={() => {
              window.scrollTo({
                top: postsRef.current?.offsetTop,
                behavior: "smooth",
              });
            }}
            className="bg-secondary"
          >
            Find
          </Button>
        </article>
      </section>

      <section ref={postsRef} className="">
        <h2 className="py-4">Recent posts</h2>
        {[...(filteredPosts || [])].reverse().map((post) => {
          return <PostCard key={post.id} post={post} sessionUser={user} />;
        })}
      </section>
    </main>
  );
};

export default Home;
