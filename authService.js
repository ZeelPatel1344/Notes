import jwtDecode from 'jwt-decode';

const TOKEN_EXPIRATION_TIME = 20000; 

const generateToken = (email) => {
  const time = new Date().getTime();
  const token = btoa(`${email}:${time}`);
  const refreshToken = btoa(`${email}:refresh`);
  console.log(token);
  console.log(refreshToken);
  return { token, refreshToken };
};

const decodeToken = (token) => {
  const decoded = atob(token).split(':');
  return { email: decoded[0], time: parseInt(decoded[1], 10) };
};

export const register = (email, password) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return Promise.reject({ msg: 'Email already registered' });
  }
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  return Promise.resolve({ msg: 'Registration successful' });
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    const { token, refreshToken } = generateToken(email);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return Promise.resolve({ token, refreshToken });
  } else {
    return Promise.reject({ msg: 'Invalid credentials' });
  }
};

export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return Promise.reject({ msg: 'No refresh token found' });
  }
  const decoded = atob(refreshToken).split(':');
  const email = decoded[0];
  const { token } = generateToken(email);
  localStorage.setItem('token', token);
  return Promise.resolve({ token });
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const decoded = decodeToken(token);
  const currentTime = new Date().getTime();
  return (currentTime - decoded.time) < TOKEN_EXPIRATION_TIME;
};
