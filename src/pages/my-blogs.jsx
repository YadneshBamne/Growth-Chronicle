import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';
import CreatedBlogs from '@/components/created-blogs';

const MyBlogs = () => {

  const {user, isLoaded} = useUser();

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
  }
  return (
    <div>
      <h1 className='gradient-title font-extrabold text=5xl sm:text-7xl text-center pb-8'>
        My Blogs
      </h1>
      <CreatedBlogs/>
    </div>
  )
}

export default MyBlogs
