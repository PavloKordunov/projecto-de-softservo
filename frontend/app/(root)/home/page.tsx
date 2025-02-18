"use client";

import CreatePostNav from "@/components/CreatePostNav";
import Post from "@/components/Post";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const getAllPost = async () => {
      const res = await fetch("http://localhost:8080/api/posts");
      const data = await res.json();
      setPosts(data.body);
      console.log(data);
    };

    getAllPost();
  }, []);

  return (
    <div>
      <CreatePostNav />
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>Поки що немає постів...</p>
      )}
    </div>
  );
};

export default HomePage;
