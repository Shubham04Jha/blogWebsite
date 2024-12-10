import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import API from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;


const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    userName: '',
    postId: '',
    createDate: '',
    description: ''
}

const Comments = ({ post }) => {
    // console.log(post);
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        if(post._id) getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            userName: account.username,
            postId: post._id,
            description: e.target.value
        });
    }

    const addComment = async() => {
        comment.createDate = new Date();
        await API.createComment(comment);
        setComment(initialValue)// wait why was thing working? oh yea after posting we need to revert back to previous blanck version
        setToggle(prev => !prev);//todo for some reason when this toggles it doesn't immediately shows. dk the reason... toggle should rerender the comments section
    }
    
    return (
        <Box>
            <Container>
                <Box style={{height:'40px'}}>
                    <i className="material-icons" style={{
                    fontSize: '30px', 
                    color: 'black', 
                    padding: '10px', 
                    border: '2px solid #333', 
                    borderRadius: '8px', 
                    backgroundColor: '#f9f9f9'
                    }}>
                    person
                    </i>   
                </Box>
                <StyledTextArea 
                    rowsmin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.description}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box >
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;