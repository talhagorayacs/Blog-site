import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../componets";

function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    }).catch(error => {
      console.error("Error fetching posts:", error);
      setPosts([]); // Optional: set an empty array or handle error state
    });
  }, []);

  if (posts === null) {
    // Loading state
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    // No posts available
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">No posts available</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Render posts
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
