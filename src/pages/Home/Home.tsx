import { useNavigate } from "react-router";
import "./Home.scss";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/ui/PrimaryButton/PrimaryButton";
import { getPosts } from "../../utils/posts";
import { Post } from "../../utils/types/posts";
import Select from "react-select";
import { Tag } from "../../utils/types/schemas";
import { getTags } from "../../utils/api";
import NotFound from "../../components/NotFound/NotFound";
import Card from "../../components/Card/Card";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>();
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);

  const fetchData = async () => {
    const postsData = await getPosts();
    const res = await getTags();
    setPosts(postsData);
    setTags(res);
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

  return (
    <div className="home">
      <main className="home__main">
        <section className="landing">
          <h1 className="landing__text">
            We help people find lost dogs, and help stray dogs find homes
          </h1>
          <img src="/cover_2.svg" className="landing__image" />
        </section>
        <section className="subnav">
          <PrimaryButton
            className="subnav__button"
            buttonWidth="fit-content"
            onClick={() =>
              document
                .getElementById("home-posts")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Find a lost dog
          </PrimaryButton>
          <PrimaryButton
            className="subnav__button"
            buttonWidth="fit-content"
            onClick={() => navigate("/posts/create-post")}
          >
            Report sighting of a lost dog
          </PrimaryButton>
        </section>
        <section className="home-posts">
          <Select
            isMulti
            options={tagOptions}
            className="home-posts__tags-select"
            classNamePrefix="select"
            onChange={(selectedOptions) => {
              setSelectedTags(
                selectedOptions.map((option) => ({
                  name: option.label,
                  id: option.value,
                }))
              );
            }}
            placeholder="Apply Filters"
          />
          {!filteredPosts ? (
            <h2 className="home-posts__none">No Posts</h2>
          ) : selectedTags && filteredPosts.length === 0 ? (
            <NotFound content="No posts have that tag" />
          ) : (
            <article className="home-posts__content" id="home-posts">
              {filteredPosts.map((post) => {
                return <Card key={post.id} {...post} />;
                // return <HomeCard key={post.id} {...post} />;
              })}
            </article>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;

export const primary = "#76bd6b";
export const secondary = "#efeded";
export const tertiary = "#ffa500";
