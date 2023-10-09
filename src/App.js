import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Register } from './Component/Register';
import { Login } from './Component/login';
import { Dashboard } from './Component/Dashboard';
import axios from 'axios'
import { User } from './Component/User';
import PrivateRoute from './PrivateRoute';
axios.defaults.baseURL = 'https://nice-rose-squirrel-hose.cyclic.app';

axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/register" element={<Register/>}/> 
       <Route path="/login" element={<Login/>}/> 
       <Route path='/' element={<Navigate replace to="/Dashboard"/>}/>
       <Route element={<PrivateRoute />}>
       <Route path="/Dashboard" element={<Dashboard/>}/> 
         
         <Route path='/user/:id' element={<User/>}>      
            </Route>
      

       </Route>

    </Routes>
</BrowserRouter>
  );
}

export default App;
