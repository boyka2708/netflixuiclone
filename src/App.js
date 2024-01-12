import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout,login, selectUser } from "./features/userSlice";
import ProfileScreen from "./ProfileScreen";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() =>{
    const usnsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid : userAuth.uid,
          email : userAuth.email,
        }))
      }else{
        dispatch(logout());
      }});
      return usnsubscribe;
  },[dispatch])


  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen/>}></Route>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/test" element={<h1>Helo test</h1>} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
