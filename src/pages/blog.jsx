import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/use-fetch';
import { getSingleBlog } from '@/api/apiBlogs';
import { BarLoader } from 'react-spinners';
import MDEditor from '@uiw/react-md-editor';

const BlogPage = () => {

  const {isLoaded, user} = useUser();
  const { id } = useParams();

  const {
    fn: fnBlogs,
    data: blogs,
    loading: loadingBlogs,
  } = useFetch(getSingleBlog, { blog_id: id, });

  useEffect(() => {
  if(isLoaded) fnBlogs();
  }, [isLoaded]);

  if (!isLoaded || loadingBlogs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className='flex flex-col gap-8 mt-9 m-4'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{blogs?.title}</h1>
        <img src={blogs?.topics?.topic_logo_url} className='h-12' alt={blogs?.title}></img>
      </div>
      <h2 className='text-2xl sm:text3xl font-bold'>About this blog</h2>
      <p className='sm:text-lg'>{blogs?.description}</p>
      <MDEditor.Markdown source={blogs?.requirements} className='bg-transparent sm:text-lg' />
    </div>
  )
}

export default BlogPage
