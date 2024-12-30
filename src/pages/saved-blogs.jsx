import React from 'react'
import { getSavedBlogs } from '@/api/apiBlogs';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';
import { useEffect } from 'react';
import BlogCard from '@/components/blog-card';

const SavedBlogs = () => {

  const {isLoaded} = useUser();

  const{
    loading: loadingSavedBlogs,
    data: savedBlog,
    fn: fnSavedBlogs,
  }= useFetch(getSavedBlogs);


  useEffect(() => {
    if(isLoaded) fnSavedBlogs();
  }, [isLoaded])

  if(!isLoaded || loadingSavedBlogs){
    return <BarLoader className='mb-4' color={'#36d7b7'} width={"100%"} />
  }


  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        Saved Blogs
      </h1>

      {loadingSavedBlogs === false && (
        <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedBlog?.length? (
            savedBlog.map((saved)=>{
               return <BlogCard key={saved.id} blog={saved?.blog} savedInit={true} onBlogSaved={fnSavedBlogs}/>
            })
          ):(
            <div>No Saved blogs found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SavedBlogs
