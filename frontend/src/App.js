import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import DataProvider from './context/DataProvider.jsx';

//components
import Login from './components/account/Login.js';
function App() {
  return (
    <div >
        <DataProvider>
            <BrowserRouter>
              <Routes>
                  <Route path ='/login' element ={<Login/>}/>
              </Routes>
            </BrowserRouter>
        </DataProvider>
    </div>
  );
}

export default App;
