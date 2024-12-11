import { Box, styled, FormControl, InputBase, Button, TextareaAutosize, Typography } from '@mui/material';
import { useState, useEffect,useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import API from '../../service/api.js'

const PageLayOut = styled(Box)`
    margin: 64px 100px 0px;
`;
const Image = styled('img')`
    width: 100%;
    height: 40vh;
`;
const StyledForm = styled(FormControl)`
    display: flex;
    margin-top: 10px;
    flex-direction: row;
`;
const Title = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const TextBox = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 25px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`;
const initialPostDetails = {
    title: '',
    description: '',
    blogBanner: '',
    userName: '',
    category: '',
    createDate: new Date(),
};
const CreatePost = () => {
    const[searchParams] = useSearchParams();
    initialPostDetails.category = searchParams.get(`category`)?searchParams.get(`category`):'/';
    const [postDetails, setPostDetails] = useState(initialPostDetails);
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerUrl, setBannerUrl] = useState('');
    const {account} = useContext(DataContext)
    const navigate = useNavigate()
    initialPostDetails.userName = account.username;


    const supportedFormats = ['image/jpeg', 'image/png']; // Add more formats if needed

    useEffect(() => {
        if (bannerFile) {
            // Check if the file type is supported
            if (!supportedFormats.includes(bannerFile.type)) {
                alert('Unsupported file format. Please upload an image in JPG, PNG, or GIF format.');
                setBannerUrl(''); // Reset the image preview
                setBannerFile(null); // Clear the file state
            } else {
                const objectUrl = URL.createObjectURL(bannerFile);
                setBannerUrl(objectUrl);
                // Cleanup the URL when the component unmounts or the file changes
                return () => URL.revokeObjectURL(objectUrl);
            }
        }
    }, [bannerFile]); // Re-run effect when bannerFile changes

    const handleChange =(e)=>{
        setPostDetails({...postDetails,[e.target.name]:e.target.value })
    }

    const savePost = async()=>{
        try{
                postDetails.createDate = new Date();
                if(bannerFile){
                    const data = new FormData();  
                    data.append('name',bannerFile.name);
                    data.append('file',bannerFile);
                    // console.log(bannerFile);
                    // API call:
                    const response = await API.fileUpload(data);
                    // console.log(response);
                    postDetails.blogBanner = response.data.fileUrl;
                    // console.log(postDetails.blogBanner);
                }else{
                    postDetails.blogBanner = '/banner-background.jpg';
                }
                let response = await API.createPost(postDetails)
                
                if(response.isSuccess){
                    navigate(-1)
                }
            }catch(err){
                // console.log(err);
            }
    }
    return (
        <PageLayOut>
            {/* Display the selected image only if it's a valid file otherwise the default file only*/}
            <Image src = {bannerFile?bannerUrl:"/banner-background.jpg"} alt = "banner"/>
            <StyledForm>
                <label htmlFor="inputFile" style={{cursor:'pointer'}}>
                    <i className="material-icons" style={{
                        fontSize: '30px', 
                        color: 'black', 
                        marginRight: '15px', 
                        padding: '10px', 
                        backgroundColor: '#f9f9f9'
                        }}>add_circle</i>
                </label>
                <input
                    type="file"
                    id="inputFile"
                    style={{ display: 'none' }}
                    onChange={(e) => setBannerFile(e.target.files[0])}
                />
                <Title placeholder="Title" name = 'title' onChange={(e)=>handleChange(e)}/>
                <Button variant="contained" onClick={()=>savePost()}>Publish</Button>
                <label style={{cursor:'pointer'}} onClick={() => navigate(-1)}>
                    <i className="material-icons" style={{
                        fontSize: '30px', 
                        color: 'red', 
                        marginLeft: '15px', 
                        padding: '10px', 
                        backgroundColor: '#f9f9f9'
                    }} alt="cancel">cancel</i>
                </label>
            </StyledForm>
            <TextBox minRows={5} placeholder="Write contents here..." name = 'description' onChange={(e)=>handleChange(e)}/>
        </PageLayOut>
    );
};

export default CreatePost;
