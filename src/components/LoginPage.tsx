import React, { useState } from 'react';

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void; // Prop to update the login state
}

const loginCredentialsData = [
  {
    id: 'user-1',
    name: 'Shashank',
    email: 'shashank@example.com',
    password: '123456',
    role: 'agent',
    isActive: true,
  },
  {
    id: 'user-2',
    name: 'Abhilekh',
    email: 'abhilekh@example.com',
    password: '123456',
    role: 'agent',
    isActive: false,
  },
  {
    id: 'user-3',
    name: 'Himanshu',
    email: 'himanshu@example.com',
    password: '123456',
    role: 'admin',
    isActive: true,
  },
];

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = loginCredentialsData.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {

      localStorage.setItem(
        'user',
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );
      setIsLoggedIn(true);
      //window.location.reload(); // Reload the page to reflect the login state
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Log in to DigiCoder</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;