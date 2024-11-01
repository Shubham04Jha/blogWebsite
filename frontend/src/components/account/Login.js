import {Box,TextField,Button,styled,Typography} from '@mui/material';
import { useState } from 'react';

const OuterBox = styled(Box)`
  display: flex;
  width: 500px;
  height: 500px;
  margin:auto;
  margin-top:150px;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;
const Wrapper = styled(Box)`
  display : flex;
  flex-direction: column;
  flex:0.7;
  margin:auto;
`;

const Login = ()=>{
  const [oldUser,userType] = useState(true);
  const toggle = ()=>{
    userType(!oldUser);
  }
    return(
        <OuterBox>
          { oldUser?
            <Wrapper>
              <TextField variant='standard'label='Enter username'></TextField>
              <TextField variant='standard' label='Enter password'></TextField>
              <Button variant="contained">Signin</Button>
              <Typography style={{textAlign:'center'}}>Or</Typography>
              <Button variant="outlined" onClick={toggle}>Signup</Button>
            </Wrapper>
            :
            <Wrapper>
              <TextField variant='standard' label='Enter name'></TextField>
              <TextField variant='standard'label='Enter username'></TextField>
              <TextField variant='standard'label='Enter password'></TextField>
              <Button variant="contained" >Signup</Button>
              <Typography style={{textAlign:'center'}}>Or</Typography>
              <Button variant="outlined" onClick={toggle}>Already an User</Button>
            </Wrapper>
          }
        </OuterBox>
      )
}
export default Login;