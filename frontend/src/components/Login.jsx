/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../App";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await(await fetch('http://localhost:4000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })).json()

    if (result.accesstoken) {
      setUser({
        accesstoken: result.accesstoken,
      })
    } else {
      console.log(result.error)
    }

  };

  const handleChange = (e) => {
    if(e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value)
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="login-input">
          <input
            type="text"
            value={email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            type="text"
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
