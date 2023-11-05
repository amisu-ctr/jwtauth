/* eslint-disable no-unused-vars */
import  {useEffect, useState, createContext } from "react"
import {Route, Routes}  from 'react-router-dom'

import Navigation from "./components/Navigation"
import Login from "./components/Login"
import Register from "./components/Register"
import Protected from "./components/Protected"
import Content from "./components/Content"



export const UserContext = createContext([])

function App() {
 const [user, setUser] = useState({});
 const [loading, setLoading] = useState(true)

 const logOutCallback = async () => {

 }

 useEffect(() => {

 }, [])

  return (
   <UserContext.Provider value={[user, setUser]}>
     <div className="App">
      <Navigation logoutcallback={logOutCallback} />
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
