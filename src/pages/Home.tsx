import { getAll } from "@/api/utils";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Post, PostWithUserDetails } from "@/types/posts";
import { Tag } from "@/types/schemas";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostWithUserDetails[]>();
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<
    PostWithUserDetails[] | null
  >(null);

  const fetchData = async () => {
    const postsData = await getAll<PostWithUserDetails[]>("posts");
    const tagsData = await getAll<Tag[]>("tags");
    setPosts(postsData);

    if (tagsData) {
      setTags(tagsData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tagOptions = tags?.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

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

  console.log("tags", tags);

  console.log("posts", posts);

  return (
    <main>
      <section className="flex flex-col">
        <h1 className="w-64">
          We help people find lost dogs, and help stray dogs find homes
        </h1>
        <img
          src="/cover.svg"
          alt="landing illustration of a dog"
          className="w-80 self-end"
        />
        <ChevronDown className="w-20 h-20 stroke-[0.5] mx-auto my-10" />
      </section>
      <section className="h-[26rem] flex flex-col bg-my-primary w-screen justify-evenly items-center px-0">
        <article className="flex flex-col items-center gap-5 text-center">
          <h2 className="w-72">Report the sighting of a lost or stray dog</h2>
          <Button
            className="bg-my-secondary"
            variant="primary"
            onClick={() => navigate("/posts/create-post")}
          >
            Report
          </Button>
        </article>
        <article className="flex flex-col items-center gap-5 text-center">
          <h2 className="w-72">Find a lost dog</h2>
          <Button className="bg-my-secondary" variant="primary">
            Find
          </Button>
        </article>
      </section>

      <section>
        {filteredPosts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </section>
    </main>
  );
};

export default Home;
