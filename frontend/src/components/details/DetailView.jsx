import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import API  from '../../service/api';

import { DataContext } from '../../context/DataProvider';



const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
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

const DetailView = () => {
    const url = '/banner-background.jpg';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);
    // console.log(account); for some strange reason i used username for context and userName for post...
    // console.log(post);


    return (
        <Container>
            <Image src={post.blogBanner=='defaultImage'?'/banner-background.jpg':post.blogBanner} alt="post-Banner" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.userName && 
                    <>  
                        <i className="material-icons" style={{
                        fontSize: '30px', 
                        color: 'blue', 
                        marginRight: '15px', 
                        padding: '10px', 
                        border: '2px solid #333', 
                        borderRadius: '8px', 
                        backgroundColor: '#f9f9f9'
                        }}>edit</i>

                        <i className="material-icons" style={{
                        fontSize: '30px', 
                        color: 'red', 
                        padding: '10px', 
                        border: '2px solid #333', 
                        borderRadius: '8px', 
                        backgroundColor: '#f9f9f9'
                        }}>delete</i>
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author: <span style={{fontWeight: 600}}>{post.userName}</span></Typography>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
        </Container>
    )
}

export default DetailView;