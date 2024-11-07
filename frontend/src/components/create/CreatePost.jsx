
import {Box,styled, FormControl,InputBase, Button,TextareaAutosize} from '@mui/material';

const PageLayOut = styled(Box)`
    margin: 64px 100px 0px;
`
const Image = styled('img')`
    width:100%;
    height:30vh;
`
const StyledForm = styled(FormControl)`
    display:flex;
    margin-top:10px;
    flex-direction:row;
`
const Title = styled(InputBase)`    
    flex:1;
    margin: 0 30px;
    font-size:25px;
`
const TextBox = styled(TextareaAutosize)`
    width:100%;
    margin-top:25px;
    font-size:18px;
    border:none;
`
const  createPost = ()=>{
    return (
    <PageLayOut>
        <Image src="/banner-background.jpg" alt="banner" />
        <StyledForm>
            <label htmlFor='inputFile'>
                <i className="material-icons">
                    add_circle
                </i>
            </label>
            <input type="file" id='inputFile' style={{display:"none"}} />
            <Title placeholder='Title'/>
            <Button variant='contained'>
                Publish
            </Button>
        </StyledForm>
        <TextBox minRows = {5} placeholder='Write contents here...'  />
    </PageLayOut>
    )
}

export default createPost;