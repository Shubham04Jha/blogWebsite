import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";

import API from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787; 
`;


const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext)
    
    const removeComment = async () => {
        // console.log(comment._id);
        try {
            await API.deleteComment(comment._id);
        } catch (err) {
            console.log(err);
        }
        setToggle(prev => !prev);
    }

    return (
        <Component >
            <Container>
                <Name>{comment.userName}</Name>
                <StyledDate>{new Date(comment.createDate).toDateString()}</StyledDate>
                { comment.userName === account.username && 
                        <label style={{marginLeft:'5px'}}onClick={removeComment}>
                            <i className="material-icons" style={{
                            fontSize: '20px', 
                            color: 'red', 
                            border: '2px solid #333', 
                            borderRadius: '8px', 
                            backgroundColor: '#f9f9f9',
                            hover:'pointer'
                        }}>delete</i> 
                        </label>
                }
            </Container>
            <Typography>{comment.description}</Typography>
        </Component>
    )
}

export default Comment;