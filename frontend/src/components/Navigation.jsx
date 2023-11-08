import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../App';


const Navigation = () => {
  const [user, setUser, logOutCallback ] = useContext(UserContext);
  return (
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/protected'>Protected</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><button type='button' onClick={logOutCallback}>Log Out</button></li>
    </ul>
  )
}

export default Navigation