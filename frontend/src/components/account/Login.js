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
    setError('');
  }
  const onInputChange = (e)=>{
    const {name,value} = e.target;
    setUserInfo({ ...userInfo,[name]:value});
    console.log(userInfo);
  }


  const onSignup = async () => {
    try {
        let response = await API.userSignup(userInfo);
        console.log('Response from API:', response);
        if (response.isSuccess) {
            toggle();
        }
      }catch (error) {
        console.log(error);
        if (error.code === 409) {
          console.log('user exists!');
          alert(error.msg);
        } else {
            alert('Signup failed: ' + error.msg);
        }
        setError('error occurred while signing you up!'); 
      }
  };

  const onLogin = async ()=>{
    const userObj = {username:userInfo.username,password:userInfo.password}
    try{
      let response = await API.userLogin(userObj);
      if(response.isSuccess){
        console.log('login successful');
        setError('');
      }
    }catch(error){
      console.log(error);
      console.log('login unseccessful');
      setError('Something went wrong while signing you up! check the password and username or else its our fault.')
    }
  }

    return(
        <OuterBox>
          { oldUser?
            <Wrapper>
              <TextField variant='standard' name='username' label='Enter username' onChange={onInputChange}></TextField>
              <TextField variant='standard' name='password' label='Enter password' onChange={onInputChange}></TextField>
              <Button variant="contained" onClick={onLogin}>Sign in</Button>
              <Typography style={{textAlign:'center'}}>Or</Typography>
              <Button variant="outlined" onClick={toggle}>Sign up</Button>
              {error&&<Typography>{error}</Typography>}
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