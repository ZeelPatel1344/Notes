import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, refreshAccessToken } from './authService';

class PrivateRoute extends React.Component {
  state = {
    isAuth: isAuthenticated(),
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.isAuth) {
        refreshAccessToken().then(() => {
          this.setState({ isAuth: isAuthenticated() });
        }).catch(() => {
          this.setState({ isAuth: false });
        });
      }
    }, 10000); // Refresh token every 10 seconds for demo
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.state.isAuth ? this.props.children : <Navigate to="/login" />;
  }
}

export default PrivateRoute;
