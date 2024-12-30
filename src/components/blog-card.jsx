// eslint-disable react/prop-types
import { useUser } from "@clerk/clerk-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteBlog, saveBlog } from "@/api/apiBlogs";
import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

const BlogCard = ({
  blog,
  isMyBlog = false,
  savedInit = false,
  onBlogSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const {
    fn: fnSavedBlogs,
    data: savedBlogs,
    loading: loadingSavedBlogs,
  } = useFetch(saveBlog, {alreadySaved: saved,});

  const handleSaveBlog = async () => {
    await fnSavedBlogs({ user_id: user.id, blog_id: blog.id });
    onBlogSaved();
  };


  const {loading: loadingDeleteBlog, fn: fnDeleteBlog} = useFetch(deleteBlog, {
    blog_id: blog.id,
  });

  const handleDeleteBlog = async () => {
    await fnDeleteBlog();
    onBlogSaved();
  };

  useEffect(() => {
    if (savedBlogs !== undefined)setSaved(savedBlogs?.length > 0);
  }, [savedBlogs]);

  return (
    <Card className="flex flex-col">
      {loadingDeleteBlog && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7"/>
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {blog.title}
          {isMyBlog && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteBlog}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {blog.topic && (
            <img src={blog.topic.topic_logo_url} alt="topic" className="h-6" />
          )}
        </div>
        <hr />
        {blog.description.substring(0, blog.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/blog/${blog.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyBlog && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveBlog}
            disabled={loadingSavedBlogs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
