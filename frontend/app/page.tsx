"use client";

import CreatePostNav from "@/components/CreatePostNav";
import HomeLayout from "@/app/(root)/layout";
import { useOktaAuth } from "@okta/okta-react";
import Link from "next/link";
import PostPage from "@/app/(root)/post/[id]/page";

const Page = () => {
    const { authState } = useOktaAuth();
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
                </div>
            </HomeLayout>
            <PostPage />
        </div>
    );
}

export default Page;
