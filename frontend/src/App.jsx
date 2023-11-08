/* eslint-disable no-unused-vars */
import  {useEffect, useState, createContext } from "react"
import {Route, Routes, useNavigate}  from 'react-router-dom'


import Navigation from "./components/Navigation"
import Login from "./components/Login"
import Register from "./components/Register"
import Protected from "./components/Protected"
import Content from "./components/Content"



export const UserContext = createContext([])

function App() {
 const [user, setUser] = useState({});
 const [loading, setLoading] = useState(true)
 const navigate = useNavigate()

 const logOutCallback = async() => {
  await fetch("http://localhost:4000/logout", {
    method: 'POST',
    credentials: 'include',
  })
  // Clear user from context
  setUser({});
  // Navigate back to startpage
  navigate('/')
 }



// First thing, get a new accesstoken if a refresh token exist
 useEffect(() => {
  async function checkRefreshToken() {
    const result = await (await fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();
    console.log(result)
    setUser({
      accesstoken: result.accesstoken,
    });
    setLoading(false); 
  }
  checkRefreshToken();
 }, []);

 if (loading) return <div>Loading ...</div>

  return (
   <UserContext.Provider value={[user, setUser, logOutCallback ]}>
     <div className="App">
      <Navigation  />
      <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/protected" element={<Protected />} />
      </Routes>
    </div>
    </UserContext.Provider>
  )
}

export default App
