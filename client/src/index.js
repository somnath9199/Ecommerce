import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './pages/Login';
import TestingPage from './pages/Testingpage';
import Home from './pages/Home'
import {AuthProvider} from './auth/Authcontext'
import ProtectedRoute from './auth/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
       <Route path='/Login' element={<Login/>}/>
       <Route path='/' element={<TestingPage/>}/>

       {/* <ProtectedRoute path="/Home" component={Home} /> */}
      <Route path='/Home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
