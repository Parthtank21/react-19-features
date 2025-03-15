// https://react.dev/reference/react/use

import { Suspense, use, useEffect, useState } from "react";

const OldMethodComponent = () => {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .finally(() => setPending(false));
  }, []);

  return (
    <div style={{ padding: "15px", border: "1px solid black" }}>
      <h2>Old Method - useEffect hook</h2>
      {pending ? (
        <p>Fetching posts...</p>
      ) : (
        <ol>
          {posts.slice(0, 10).map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ol>
      )}
    </div>
  );
};

const fetchPosts = fetch("https://jsonplaceholder.typicode.com/posts").then(
  (res) => res.json()
);

const Posts = () => {
  const posts = use<{ id: number; title: string }[]>(fetchPosts);

  return (
    <ol>
      {posts.slice(0, 10).map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ol>
  );
};

const NewMethodComponent = () => {
  return (
    <div style={{ padding: "15px", border: "1px solid black" }}>
      <h2>New Method - use hook</h2>
      <Suspense fallback={<p>Fetching posts...</p>}>
        <Posts />
      </Suspense>
    </div>
  );
};

export default function NewHook3() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <OldMethodComponent />
      <NewMethodComponent />
    </div>
  );
}
