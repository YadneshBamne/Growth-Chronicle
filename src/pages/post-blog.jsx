import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { getTopics } from "@/api/apiTopics";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addNewBlog } from "@/api/apiBlogs";
import { useNavigate } from "react-router-dom";
import AddTopicDrawer from "@/components/add-topic-drawer";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  topic_id: z.string().min(1, { message: "Select or add a new topic" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostBlog = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnTopics,
    data: topics,
    loading: loadingTopics,
  } = useFetch(getTopics);

  useEffect(() => {
    if (isLoaded) fnTopics();
  }, [isLoaded]);

  const {
    fn: fnCreateBlog,
    loading: loadingCreateBlog,
    error: errorCreateBlog,
    data: dataCreateBlog,
  } = useFetch(addNewBlog);

  const onSubmit = (data) => {
    fnCreateBlog({
      ...data,
      recruiter_id: user.id,
    });
  };

  useEffect(() => {
    if (dataCreateBlog && !loadingCreateBlog) {
      navigate("/blogs");
    }
  }, [dataCreateBlog, loadingCreateBlog]);

  if (!isLoaded || loadingTopics) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Blog
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input placeholder="Blog title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Blog Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex items-center gap-4">
          <Controller
            name="topic_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by topics">
                    {field.value
                      ? topics?.find((topic) => topic.id === field.value)?.name
                      : "Topics"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {topics?.map(({ name, id }) => (
                      <SelectItem key={id} value={id.toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddTopicDrawer fetchTopics = {fnTopics} />
        </div>
        {errors.topic_id && (
          <p className="text-red-500">{errors.topic_id.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value || ""} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}

        {errorCreateBlog && (
          <p className="text-red-500">{errorCreateBlog.message}</p>
        )}

        {loadingCreateBlog && <BarLoader width={"100%"} color="#36d7b7" />}

        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Post
        </Button>
      </form>
    </div>
  );
};

export default PostBlog;
