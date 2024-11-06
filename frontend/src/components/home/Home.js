import { styled } from '@mui/material';

import { Grid2 } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories.jsx';

const HomeContainer = styled('div')`
  margin-top: 64px;
`;

const Home = () => {
    const side = 1;
    const main = 12-side;
    return (
        <HomeContainer>
            <Banner />
            <Grid2 container>
                <Grid2 item size={side}>
                    <Categories />
                </Grid2>
                <Grid2 container size = {main}>
                    <h1>Hello from the posts!</h1>
                </Grid2>
            </Grid2>
        </HomeContainer>
    );
};

export default Home;
