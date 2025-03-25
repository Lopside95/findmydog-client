import { getAll } from "@/api/utils";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/posts";
import { Tag } from "@/types/schemas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>();
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);

  const fetchData = async () => {
    const postsData = await getAll<Post[]>("posts");
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
    <div>
      <h1>Home</h1>
      <Button className="bg-primary" onClick={() => console.log("Helllolol")}>
        Welcome to the home page!
      </Button>
    </div>
  );
};

export default Home;
