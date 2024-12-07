import { Box, styled } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories.jsx';

import Posts from './post/Posts.js';

const HomeContainer = styled('div')`
  margin-left:30px;
`;

const ImgContainer = styled(Box)`
    margin-top:64px;
`;

const PostSection = styled(Box)` 
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
    return (
        <>
            <ImgContainer>
                <Banner />
            </ImgContainer>
            <HomeContainer>
                <div className='m-1 grid grid-cols-1 gap-3 sm:grid-cols-12 '>
                    <div className='sm:col-span-2 '>
                        <CategoriesContainer>
                            <Categories />
                        </CategoriesContainer>
                        {/* <div className='min-h-[100px] rounded-lg shadow bg-teal-500'></div> */}
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:col-span-10 ">
                        <Posts/>
                        {/* <div className='min-h-[100px] rounded-lg shadow bg-orange-500'></div>
                        <div className='min-h-[100px] rounded-lg shadow bg-purple-500'></div> */}
                    </div>
                </div>
            </HomeContainer>
        </>
    );
};

export default Home;
