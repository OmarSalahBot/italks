import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/login';
import AllPagesBackground from '../components/global components/allPagesBackground';
import toast from 'react-hot-toast';
import { useAuthStore } from '../Store/useAuthStore';
import { Loader } from "lucide-react";
import ChatApp from './pages/ChatApp';
import Loading from '../components/global components/Loading';

const App = () => {
  const { authCheck , user , isCheckingAuth } = useAuthStore();

  useEffect(()=>{
    authCheck();
  },[authCheck]);

  if(isCheckingAuth) return <Loading show={true} /> ;

  return (
    <Router>
      <Routes>
        <Route element={<AllPagesBackground/>}>
            <Route path="/login" element={!user? <Login /> : <Navigate to={'/'}/> }/>
            <Route path="/signup" element={!user? <SignUp/> : <Navigate to={'/'}/> }/>
        </Route>
        <Route path="/" element={user? <ChatApp/> : <Navigate to={'/login'}/> }/>
      </Routes>
    </Router>
      
  );
}

export default App;
