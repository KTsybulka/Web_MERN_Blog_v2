import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostItem } from '../components/PostItem'

import axios from '../utils/axios'


export const PostsPage = () => {
  const [posts, setPosts] = useState([])

  const fetchMyPosts = async () => {
      try {
          const { data } = await axios.get('/posts/user/me')  //correct rout!!
        //   const { data } = await axios.get('/posts/user/myprofile') // to avoid a visible error
        
          console.log("Fetched data:", data);
          setPosts(data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      fetchMyPosts()
  }, [])

  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
        {posts?.map((post, idx) => (
            <PostItem post={post} key={idx} />
        ))}
    </div>
)
}
