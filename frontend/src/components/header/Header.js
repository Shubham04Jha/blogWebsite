
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import API from '../../service/api.js';
import {getRefreshToken} from '../../utils/common-utils.js';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const logOut = async()=>{
    // console.log('logout!')
    const token = getRefreshToken();
    await API.userLogOut({token});
}

export const Header = ({userAuthentication}) => {
        // console.log('boolean : '+userAuthentication);
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link onClick={logOut} to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;