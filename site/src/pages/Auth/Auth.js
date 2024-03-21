import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../fragments/Loading';
import styles from './Auth.module.css';
import config from '../../config/config';
import { userGet, saveSession, requestApi } from '../../utils';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formEmail: '',
      formPassword: '',
      formUsername: '',
      formRole: '',
      formError: '',
    };
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleFormInput(field, value) {
    value = value.trim();
    const nextState = {};
    nextState[field] = value;
    this.setState(nextState);
  }

  async handleFormSubmit(evt) {
    evt.preventDefault();
    console.log('Formulario enviado');
    this.setState({ loading: true });
    const { formEmail, formPassword, formUsername, formRole } = this.state;

    if (!formEmail || !formPassword) {
      return this.setState({
        formError: 'Correo electrónico y contraseña son obligatorios',
        loading: false,
      });
    }

    try {
      const apiUrl = config.domains.api;
      let token;
      if (this.props.authType === 'register') {
        if (!formUsername || !formRole) {
          return this.setState({
            formError: 'Todos los campos son obligatorios',
            loading: false,
          });
        }
        const requestBody = {
          email: formEmail,
          password: formPassword,
          username: formUsername,
          role: formRole,
        };
        token = await this.sendFormData(requestBody, 'register');
        console.log('Token generado:', token);
        const userData = await userGet(token.token, apiUrl);
        saveSession(userData.user.id, formEmail, token.token);
        this.setState({ loading: false });
        console.log('Redirigiendo a /public/users/login');
        this.props.history.push('/public/users/login');

      } else if (this.props.authType === 'login') {
        token = await this.sendFormData({ email: formEmail, password: formPassword }, 'login');
        console.log('Token generado:', token);
        const userData = await userGet(token.token, apiUrl);
        saveSession(userData.user.id, formEmail, token.token);
        this.setState({ loading: false });
        console.log('Redirigiendo a /dashboard');
        this.props.history.push('/dashboard');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      this.setState({
        formError: error.message || 'Lo siento, ocurrió un error desconocido. Por favor, inténtalo de nuevo.',
        loading: false,
      });
    }
  }

  async sendFormData(data, route) {
    try {
      const response = await requestApi(route, config.method, data);
      return response;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

  handleRegisterClick() {
    console.log('Redirigiendo a /public/users/register');
    this.props.history.push('/public/users/register');
  }

  handleLoginClick() {
    console.log('Redirigiendo a /public/users/login');
    this.props.history.push('/public/users/login');
  }

  render() {
    return (
      <div className={`${styles.container} animateFadeIn`}>
        <div className={styles.containerInner}>
          <Link to='/' className={styles.logo}>
            <img draggable='false' src='/fullstack-app-title.png' alt='serverless-fullstack-application' />
          </Link>
          {this.state.loading && <div><Loading className={styles.containerLoading} /></div>}
          {!this.state.loading && (
            <div className={styles.containerRegister}>
              <form className={styles.form} onSubmit={this.handleFormSubmit}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Correo electrónico</label>
                  <input
                    type='text'
                    placeholder='tucorreo@example.com'
                    className={styles.formInput}
                    value={this.state.formEmail}
                    onChange={(e) => this.handleFormInput('formEmail', e.target.value)}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Contraseña</label>
                  <input
                    type='password'
                    placeholder='tu contraseña'
                    className={styles.formInput}
                    value={this.state.formPassword}
                    onChange={(e) => this.handleFormInput('formPassword', e.target.value)}
                  />
                </div>
                {this.props.authType === 'register' && (
                  <div>
                    <div className={styles.formField}>
                      <label className={styles.formLabel}>Nombre de usuario</label>
                      <input
                        type='text'
                        placeholder='tu nombre de usuario'
                        className={styles.formInput}
                        value={this.state.formUsername}
                        onChange={(e) => this.handleFormInput('formUsername', e.target.value)}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.formLabel}>Rol</label>
                      <input
                        type='text'
                        placeholder='tu rol'
                        className={styles.formInput}
                        value={this.state.formRole}
                        onChange={(e) => this.handleFormInput('formRole', e.target.value)}
                      />
                    </div>
                  </div>
                )}
                {this.state.formError && (
                  <div className={styles.formError}>{this.state.formError}</div>
                )}
                <button
                  className={`buttonPrimaryLarge ${styles.formButton}`}
                  type='submit'
                >
                  {this.props.authType === 'register' ? 'Registrar' : 'Iniciar sesión'}
                </button>
              </form>
              <div className={styles.switchAuthType}>
                <span>{this.props.authType === 'register' ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}</span>
                <button className={`${styles.switchButton} ${styles.customButton}`} onClick={this.props.authType === 'register' ? this.handleLoginClick : this.handleRegisterClick}>
                  {this.props.authType === 'register' ? 'Iniciar sesión' : 'Registrarse'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Auth);
