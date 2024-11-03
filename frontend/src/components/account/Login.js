import {Box,TextField,Button,styled,Typography} from '@mui/material';
import { useState } from 'react';

import API from '../../service/api.js'
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
const signUpInitialValues = {
  name:'', username:'', password:''
}
const Login = ()=>{
  
  const [oldUser,userType] = useState(true);

  const [userInfo,setUserInfo] = useState(signUpInitialValues);

  const [error,setError] = useState('');
  const toggle = ()=>{
    userType(!oldUser);
  }
  const onInputChange = (e)=>{
    const {name,value} = e.target;
    setUserInfo({ ...userInfo,[name]:value});
    console.log(userInfo);
  }


  const onSignup = async () => {
    console.log('Signup payload:', userInfo);
    try {
        let response = await API.userSignup(userInfo);
        console.log('Response from API:', response); // Log the entire response

        if (response.isSuccess) {
            toggle(); // Handle successful signup
        } else if (response.code === 409) {
            alert(response.msg); // This should be triggered for existing user
        } else {
            alert('Signup failed: ' + response.msg); // Handle other failures
        }
    } catch (error) {
        console.error('API error:', error);
        const errorMessage = error.msg?.message || 'An unexpected error occurred';
        alert(errorMessage); // General error handling
    }
  };



    return(
        <OuterBox>
          { oldUser?
            <Wrapper>
              <TextField variant='standard' name='username' label='Enter username' onChange={onInputChange}></TextField>
              <TextField variant='standard' name='password' label='Enter password' onChange={onInputChange}></TextField>
              <Button variant="contained">Signin</Button>
              <Typography style={{textAlign:'center'}}>Or</Typography>
              <Button variant="outlined" onClick={toggle}>Signup</Button>
            </Wrapper>
            :
            <Wrapper>
              <TextField variant='standard' name='name' label='Enter name' onChange={onInputChange}></TextField>
              <TextField variant='standard' name = 'username' label='Enter username' onChange={onInputChange}></TextField>
              <TextField variant='standard'name='password' label='Enter password' onChange={onInputChange}></TextField>
              <Button variant="contained" onClick={onSignup} >Signup</Button>
              <Typography style={{textAlign:'center'}}>Or</Typography>
              <Button variant="outlined" onClick={toggle}>Already an User</Button>
              {error&&<Typography>{error}</Typography>}
            </Wrapper>
          }
        </OuterBox>
      )
}
export default Login;