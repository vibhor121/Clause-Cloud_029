import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const AuthContainer = styled.div`
  margin-bottom: 20px;
`

const UserAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users from json-server when component mounts
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error))
  }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setIsLoggedIn(true)
    } else {
      alert('Invalid username or password')
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (users.some(u => u.username === username)) {
      alert('Username already exists')
    } else {
      const newUser = { username, password }
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
        if (response.ok) {
          const addedUser = await response.json()
          setUsers([...users, addedUser])
          setIsLoggedIn(true)
        } else {
          alert('Failed to sign up')
        }
      } catch (error) {
        console.error('Error signing up:', error)
        alert('An error occurred while signing up')
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (isLoggedIn) {
    return (
      <AuthContainer>
        <p>Welcome, {username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </AuthContainer>
    )
  }

  return (
    <AuthContainer>
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </AuthContainer>
  )
}

export default UserAuth