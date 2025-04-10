"use client";

import CreatePostNav from "@/components/CreatePostNav";
import Post from "@/components/Post";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getAllPost = async () => {
      const res = await fetch("https://localhost:8080/api/posts", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${user?.accessToken ? `Bearer ${user?.accessToken}` : null}`,
        },
      });
      const data = await res.json();
      setPosts(data.body);
      console.log(data);
    };

    getAllPost();
  }, []);

  return (
    <div >
      <CreatePostNav />
      {posts ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>Поки що немає постів...</p>
      )}
    </div>
  );
};

export default HomePage;
