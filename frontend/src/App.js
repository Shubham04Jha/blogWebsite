import {BrowserRouter, Routes, Route, Outlet,Navigate} from 'react-router-dom';

import DataProvider from './context/DataProvider.jsx';

import { useState } from 'react';


//components
import Login from './components/account/Login.js';
import Home from './components/home/Home.js';
import Header from './components/header/Header.js';

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
                  <Route path ='/login' element ={<Login setUserAuthentication={setUserAuthentication} userAuthentication={userAuthentication}/>}/>
                  <Route path = '/' element = {<PrivateRoute userAuthentication = {userAuthentication} />}>
                    <Route path = '/' element = {<Home/>}/>
                  </Route>
              </Routes>
            </BrowserRouter>
        </DataProvider>
    </div>
  );
}

export default App;
