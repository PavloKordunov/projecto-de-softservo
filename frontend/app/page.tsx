"use client";

import CreatePostNav from "@/components/CreatePostNav";
import HomeLayout from "@/app/(root)/layout";
import { useOktaAuth } from "@okta/okta-react";
import Link from "next/link";
import PostPage from "@/app/(root)/post/[id]/page";
import HomePage from "./(root)/home/page";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import Post from "@/components/Post";

const Page = () => {
    const { authState } = useOktaAuth();
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
            {/* rootPage */}
            <HomeLayout>
                <div className="p-6 rounded-lg  w-full max-w-4xl">
                    <h1 className="text-3xl font-bold text-center text-AccnetColor mb-6">Welcome to the Home Page</h1>
                    {authState?.isAuthenticated ? (
                        <CreatePostNav />
                    ) : (
                        <div className="text-center">
                            <p className="text-lg text-gray-600 mb-4">Please log in to access the features.</p>
                            <h2>
                                <Link
                                    href="/login"
                                    className="text-white bg-AccnetColor hover:bg-gray-600 font-semibold py-2 px-4 rounded transition duration-300"
                                >
                                    Долучитись до спільноти
                                </Link>
                            </h2>
                        </div>
                    )}
                          {posts ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>Поки що немає постів...</p>
      )}
                </div>
            </HomeLayout>
            
        </div>
    );
}

export default Page;
