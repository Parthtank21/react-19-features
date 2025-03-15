import { memo, Suspense, use, useState, useTransition } from "react";
import { sleep } from "../utils/utils";

const fetchPosts = fetch("https://jsonplaceholder.typicode.com/posts").then(
  (res) => res.json()
);

const PostList = memo(function () {
  const posts = use<{ title: string; id: number }[]>(fetchPosts);

  return (
    <ul>
      {posts.slice(0, 10).map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
});

const PostListItem = ({ post }: { post: { title: string; id: number } }) => {
  sleep(100);
  return <li>{post.title}</li>;
};

const WithoutUseTransition = () => {
  const [tab, setTab] = useState("home");

  const getStyle = (currentTab: string) => {
    return {
      backgroundColor: tab === currentTab ? "black" : "white",
      color: tab === currentTab ? "white" : "black",
    };
  };

  return (
    <div style={{ padding: "15px", border: "1px solid black" }}>
      <h2>without useTransition hook</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setTab("home")} style={getStyle("home")}>
          Home
        </button>
        <button onClick={() => setTab("post")} style={getStyle("post")}>
          Posts
        </button>
        <button onClick={() => setTab("about")} style={getStyle("about")}>
          About
        </button>
      </div>
      <div>
        {tab === "home" && <p>Home</p>}
        {tab === "post" && (
          <Suspense fallback={<p>Loading...</p>}>
            <PostList />
          </Suspense>
        )}
        {tab === "about" && <p>About</p>}
      </div>
    </div>
  );
};

const WithUseTransition = () => {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const switchTabs = (newTab: string) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  const getStyle = (currentTab: string) => {
    return {
      backgroundColor: tab === currentTab ? "black" : "white",
      color: tab === currentTab ? "white" : "black",
    };
  };

  return (
    <div style={{ padding: "15px", border: "1px solid black" }}>
      <h2>with useTransition hook</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => switchTabs("home")} style={getStyle("home")}>
          Home
        </button>
        <button onClick={() => switchTabs("post")} style={getStyle("post")}>
          Posts
        </button>
        <button onClick={() => switchTabs("about")} style={getStyle("about")}>
          About
        </button>
      </div>
      <div>
        {isPending ? (
          <p>Switching...</p>
        ) : (
          <>
            {tab === "home" && <p>Home</p>}
            {tab === "post" && (
              <Suspense fallback={<p>Loading...</p>}>
                <PostList />
              </Suspense>
            )}
            {tab === "about" && <p>About</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default function OldHook1() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <WithoutUseTransition />
      <WithUseTransition />
    </div>
  );
}
