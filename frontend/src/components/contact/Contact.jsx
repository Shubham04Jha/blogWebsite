
import { Box, styled, Typography, Link } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(/banner.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Box component = "span" style = {{marginLeft: 5}}>
                        <Link href="https://www.instagram.com/bl42e_1331" color="inherit" target="_blank">
                            Instagram
                        </Link>
                    </Box>
                    <br/>
                    <br/>
                    or follow me on 
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://x.com/Shubham37026784" target="_blank" color="inherit">
                            Linkedin.
                        </Link>
                    </Box>  
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;