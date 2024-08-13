import React,{useState,useEffect} from 'react'
import appweiteService from "../appwrite/config"
import { PostCard } from '../componets'
import { set } from 'react-hook-form'
// import { Container } from '../componets/container'

function AllPosts() {
    const [posts,setPosts] = useState([])

    useEffect(() => {
         appweiteService.getPosts([]).then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
         })
    }, [])
    
    return (
        <div className='w-full py-8'>
            <div>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                </div>
        </div>
      )
    }

export default AllPosts