import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './pages/Login';
import TestingPage from './pages/Testingpage';
import Home from './pages/Home'
import {AuthProvider} from './auth/Authcontext'
import ProtectedRoute from './auth/ProtectedRoute';
import Adminpage from './pages/Adminpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
       <Route path='/Login' element={<Login/>}/>
       <Route path='/Somnath' element={<TestingPage/>}/>
      <Route path='/Home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/Admin' element={<Adminpage/>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
