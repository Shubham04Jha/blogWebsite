import {BrowserRouter, Routes, Route, Outlet,Navigate} from 'react-router-dom';

import DataProvider from './context/DataProvider.jsx';

import { useState } from 'react';

//components
import Login from './components/account/Login.js';
import Home from './components/home/Home.js';
import Header from './components/header/Header.js';
import CreatePost from './components/create/CreatePost.jsx';
import DetailView from './components/details/DetailView.jsx';


const PrivateRoute = ({ userAuthentication,...props }) => {
    return userAuthentication ?
    <>
      <Header userAuthentication={userAuthentication}/>
      <Outlet />
    </>  : <Navigate replace to="/login" />;
};


function App() {
  const [userAuthentication,setUserAuthentication] = useState(false);
  return (
    <div >
        <DataProvider>
            <BrowserRouter>
              <Routes>
                  <Route path ='/login' element ={<Login setUserAuthentication={setUserAuthentication}/>}/>
                  <Route path = '/' element = {<PrivateRoute userAuthentication = {userAuthentication} />}>
                    <Route path = '/' element = {<Home/>}/>
                  </Route>

                  <Route path = '/create' element = {<PrivateRoute userAuthentication = {userAuthentication} />}>
                    <Route path = '/create' element = {<CreatePost/>}/>
                  </Route>
                  
                  <Route path = '/details/:id' element = {<PrivateRoute userAuthentication = {userAuthentication} />}>
                    <Route path = '/details/:id' element = {<DetailView/>}/>
                  </Route>

              </Routes>
            </BrowserRouter>
        </DataProvider>
    </div>
  );
}

export default App;
