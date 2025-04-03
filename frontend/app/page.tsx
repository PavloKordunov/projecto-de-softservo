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
import { motion } from "framer-motion";

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
            <HomeLayout>
                <div className="p-6 rounded-lg">
                    {authState?.isAuthenticated ? (
                        <CreatePostNav />
                    ) : (
                        <motion.div
                            className="text-center w-full items-center flex border-SecondaryColor border-2 p-[30px] rounded-xl justify-center mb-8 shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <motion.h2 whileHover={{ scale: 1.1 }}>
                                <Link href="/login" className="font-semibold rounded-lg shadow-md overflow-hidden block">
                                    <motion.span
                                        initial={{ backgroundPosition: "0% 50%" }}
                                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                        className="block py-2 px-6 border-white border-2 rounded-[10px] text-[20px] text-MainColor text-center"
                                        style={{ background: "linear-gradient(90deg, #ffffff, #ff4155,  #2c353d)", backgroundSize: "200% 100%" }}
                                    >
                                        Долучитись до спільноти
                                    </motion.span>
                                </Link>
                            </motion.h2>
                        </motion.div>
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
