import React from "react";
import { useEffect, useState } from "react";
import { getBlogs } from "@/api/apiBlogs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import BlogCard from "@/components/blog-card";
import { getTopics } from "@/api/apiTopics";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"


const Bloglisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();
  const [topic_id, setTopic_id] = useState("");
  

  const {
    fn: fnBlogs,
    data: blogs,
    loading: loadingBlogs,
  } = useFetch(getBlogs, { searchQuery, topic_id });

  const {
    fn: fnTopics,
    data: topics,
  } = useFetch(getTopics);

  useEffect(() => {
    if (isLoaded) fnTopics();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnBlogs();
  }, [isLoaded, searchQuery, topic_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if(query) setSearchQuery(query);
  }
  const clearFilters = () => {
    setSearchQuery("");

  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Blogs
      </h1>
      {/* add filters here to filter blogs */}

      <form onSubmit={handleSearch} className="h-14 flex width-full gap-2 mb-3">
        <Input
        type="text"
        placeholder="Search Blogs by title..."
        name="search-query"
        className="h-full flex-1 px-4 text-md"

        />
        <Button type="submit" variant="blue" className="h-full sm:w-28">Search</Button>
      </form>

      {/* <div className="flex flex-col sm:flex-row gap-2">
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div> */}
 
      {loadingBlogs && (<BarLoader className="mt-4" width={"100%"} color="#36d7b7" />)}

      {loadingBlogs === false && (
        <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs?.length? (
            blogs.map((blog)=>{
               return <BlogCard key={blog.id} blog={blog} savedInit={blog?.saved?.length > 0}/>
            })
          ):(
            <div>No blogs found</div>
          )}
        </div>
      )}

    </div>
  );
};

export default Bloglisting;
