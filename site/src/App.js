import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import { userRegister, userLogin } from './utils/api';
import { getSession, saveSession } from './utils';

class App extends Component {
  async componentDidMount() {
    // console.log(getSession())
  }

  handleRegister = async (email, password, username, role) => {
    try {
      await userRegister(email, password, username, role);
      // Redirigir a la página de Dashboard después de registrarse
      this.props.history.push('/public/users/login');
      } catch (error) {
      console.error('Error during registration:', error);
      // Manejar errores de registro
    }
  };

  handleLogin = async (email, password) => {
    try {
      const userData = await userLogin(email, password);
      saveSession(userData.userId, userData.userEmail, userData.userToken); // Actualiza el manejo de la sesión aquí
      this.props.history.push('/dashboard');
      // Redirigir a la página de Dashboard después de iniciar sesión
      
    } catch (error) {
      console.error('Error during login:', error);
      // Manejar errores de inicio de sesión
    }
  };
  
  render() {
    const session = getSession();
    console.log('App - Session:', session); //  verificar la sesión

    return (
      <Router>
        <Switch>
          <Route path='/public/users/register'>
            <Auth authType="register" handleRegister={this.handleRegister} />
          </Route>

          <Route path='/public/users/login'>
            <Auth authType="login" handleLogin={this.handleLogin} />
          </Route>

          <PrivateRoute path="/dashboard" component={Dashboard} session={session} />
          <Route exact path="/" component={Home} />

          {/* Ruta de redirección por defecto */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        session ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default App;