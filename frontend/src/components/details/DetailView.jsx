import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import API  from '../../service/api';

import { DataContext } from '../../context/DataProvider';

import Comments from './comments/Comments';


const backEndUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const Container = styled(Box)(({ theme }) => ({
    margin: '64px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '40vh',
    // objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const EditDate = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: '#878787',
    marginTop: '10px',
    fontStyle: 'italic',
}));

const DetailView = () => {
    const url = '/banner-background.jpg';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            } catch (error) {
                // console.log(error);
            }
        };
        fetchData();
    }, []);
    // console.log(account); for some strange reason i used username for context and userName for post...
    // console.log(post);


    return (
        <Container>
            {/* <Image src={post.blogBanner&&(post.blogBanner=='defaultImage'?'/banner-background.jpg':backEndUrl+post.blogBanner.substring(post.blogBanner.indexOf('/file')))} alt="post-Banner" /> */}
            <Image 
                src={post.blogBanner && post.blogBanner !== 'defaultImage' ? 
                    post.blogBanner.indexOf('/file')<0?post.blogBanner:backEndUrl + post.blogBanner.substring(post.blogBanner.indexOf('/file')) : 
                    '/banner-background.jpg'} 
                alt="post-Banner" 
            />
            <Box style={{ float: 'right' }}>
            <label style={{cursor:'pointer'}} onClick={() => navigate(-1)}>
                        <i className="material-icons" style={{
                            fontSize: '30px', 
                            color: 'black', 
                            marginRight: '15px', 
                            padding: '10px', 
                            backgroundColor: '#f9f9f9', 
                            border: '2px solid #333', 
                            borderRadius: '8px', 
                            backgroundColor: '#f9f9f9'
                        }} alt="cancel">arrow_back</i>
                    </label>
                {   
                    account.username === post.userName && 
                    <>  

                        <Link to={`/update/${post._id}`}>
                        <i className="material-icons" style={{
                        fontSize: '30px', 
                        color: 'blue', 
                        marginRight: '15px', 
                        padding: '10px', 
                        border: '2px solid #333', 
                        borderRadius: '8px', 
                        backgroundColor: '#f9f9f9'
                        }}>edit</i>
                        </Link>

                        <Link onClick={async()=>{
                            try {
                                const bannerId = post.blogBanner.split('/').pop();
                                if(post.blogBanner.indexOf('/file')>=0){
                                    await API.fileDelete(bannerId); // now this will work for deletion of post with default image as banner.
                                }
                                let response=await API.deletePost(post._id);
                                if(response.isSuccess){
                                    navigate(-1);
                                }else{
                                    alert('could not delete...');
                                }
                            } catch (err) {
                                // console.log(err);
                            }
                        }}>
                            <i className="material-icons" style={{
                            fontSize: '30px', 
                            color: 'red', 
                            padding: '10px', 
                            border: '2px solid #333', 
                            borderRadius: '8px', 
                            backgroundColor: '#f9f9f9'
                            }}>delete</i>
                        </Link>

                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author: <span style={{fontWeight: 600}}>{post.userName}</span></Typography>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createDate).toDateString()}</Typography>
            </Author>
            {post.editDate && (
                <EditDate>
                    Last edited on: {new Date(post.editDate).toDateString()}
                </EditDate>
            )}
            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;