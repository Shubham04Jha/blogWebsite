import logo from './logo.svg';
import './App.css';

import DataProvider from './context/DataProvider.jsx';

//components
import Login from './components/account/Login.js';
function App() {
  return (
    <div >
        <DataProvider>
          <Login/>
        </DataProvider>
    </div>
  );
}

export default App;
