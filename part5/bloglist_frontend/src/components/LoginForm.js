import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()

    loginUser({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit={login}>LOGIN
      <div>
                Username <input value={username} onChange={({ target }) => setUsername(target.value)} id='username'/>
      </div>
      <div>
                Password <input  type="password"  value={password} onChange={({ target }) => setPassword(target.value)} id='password'/>
      </div>
      <button type='submit' id='login-button'>Login</button>
    </form>
  )
}

export default LoginForm