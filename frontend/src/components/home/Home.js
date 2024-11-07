import { Box, styled,Typography } from '@mui/material';

import { Grid2 } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories.jsx';

const HomeContainer = styled('div')`
  margin-left:30px;
`;

const ImgContainer = styled(Box)`
    margin-top:64px;
`;

const PostSection = styled(Box)`
  margin-top: 40px; 
  padding: 20px; 
`;

const CategoriesContainer = styled(Box)`
  border-bottom: 2px solid #ccc;  /* Adds a border between Categories and the posts section */
  border-right: 2px solid #ccc;  /* Adds a border between Categories and the posts section */
  padding-right: 20px; /* Optional: adds some space below the categories */
  padding-bottom: 20px; /* Optional: adds some space below the categories */
  margin-bottom: 40px; /* Adds margin below the categories for spacing */
`;

const Home = () => {
    const side = 1.6;
    const main = 12-side;
    return (
        <>
            <ImgContainer>
                <Banner />
            </ImgContainer>
            <HomeContainer>
                <Grid2 container spacing={1.5}>
                    <Grid2 item size={{xs:12,lg:side,md:side}}>
                        <CategoriesContainer>
                            <Categories />
                        </CategoriesContainer>
                    </Grid2>
                    <Grid2 item size={{xs:12, md:main, lg:main}}>
                        <PostSection>
                            <Typography variant="h4" gutterBottom>
                                Hello from the posts!
                            </Typography>
                            {/* You can add more post content here */}
                        </PostSection>
                    </Grid2>
                </Grid2>
            </HomeContainer>
        </>
    );
};

export default Home;
