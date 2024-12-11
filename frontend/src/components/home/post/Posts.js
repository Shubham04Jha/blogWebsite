
import { useEffect, useState } from "react";

import API from '../../../service/api.js'

import { Box,Grid2 } from "@mui/material";

import {Link,useSearchParams} from 'react-router-dom'

import Post from './Post.js'

const Posts = ()=>{
    const[posts,setPosts] = useState([]);
    const[searchParams] = useSearchParams();
    const category = searchParams.get('category');// works cuz change in url causes re-render of searchParams 
    useEffect( ()=>{// category response is expected here...
        const fetchData = async()=>{
            try {
                let response = await API.getAllPosts({ category : category || 'All' });
                // console.log(response);
                if(response.isSuccess){
                    setPosts(response.data);
                }
            } catch (err) {
                // console.log(err);
            }
        }
        fetchData();
    },[category]);
    return(
        <>
            {
                posts?.length ? posts.map(post => (
                    <div key={post._id} className="col-span-3">
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}> 
                            <Post post={post} />
                        </Link>
                    </div>
                )) : <Box className="col-span-10" style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
        // todo something
    )
}




export default Posts;
