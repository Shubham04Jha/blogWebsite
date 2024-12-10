
import { Box, styled, Typography, Link } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(/banner.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Shubham Jha</Typography>
                <Text variant="h5">I'm a Software Enthusiast based in India. 
                    I like problem solving and understanding how things work.<br />
                    
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Shubham04Jha" color="inherit" target="_blank">My github</Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Connect with me on 
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/shubham-jha-85522528a/" color="inherit" target="_blank">
                            Linkedin.
                        </Link>
                    </Box>  
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;