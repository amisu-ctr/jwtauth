import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await (await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
    })).json()

    if(!result.error) {
      console.log(result.message)
      navigate('/')
    } else [
      console.log(result.error)
    ]
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
        <h2>Register</h2>
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
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};


export default Register