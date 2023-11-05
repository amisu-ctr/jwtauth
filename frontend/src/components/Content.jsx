import { useContext } from "react"
import {Navigate} from 'react-router-dom'
import { UserContext } from "../App"

const Content = () => {
 const [user] = useContext(UserContext)
 if(!user.accesstoken) return <Navigate to='login' />

 return <div>This is the content</div>
}

export default Content