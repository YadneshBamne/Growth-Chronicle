import { useUser } from "@clerk/clerk-react";
import React from "react";
import useFetch from "@/hooks/use-fetch";
import { getMyBlogs } from "@/api/apiBlogs";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import BlogCard from "./blog-card";

const CreatedBlogs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedBlogs,
    data: createdBlogs,
    fn: fnCreatedBlogs,
  } = useFetch(getMyBlogs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedBlogs();
  }, [])

  if(loadingCreatedBlogs){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  }

  return <div>
    <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdBlogs?.length ? (
            createdBlogs.map((blog)=>{
               return <BlogCard key={blog.id} blog={blog} onBlogSaved={fnCreatedBlogs} isMyBlog/>
            })
          ):(
            <div>No blogs found</div>
          )}
        </div>
  </div>;
};

export default CreatedBlogs;
