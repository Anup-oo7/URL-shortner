import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import DataProvider from './components/context/DataProvider';
import Login from './components/login/Login';
import Home from './components/Home/Home';
function App() {
 
 
  
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
          
            <Route path="/"element={<Login  />} />
            <Route path="/home/:_id"element={<Home  />} />
           
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
