import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={`${styles.container} animateFadeIn`}>
        <div className={styles.containerInner}>
          <div className={`${styles.heroArtwork} animateFlicker`}>
            <img draggable='false' src={'./fullstack-app-artwork.png'} alt='serverless-fullstack-application' />
          </div>
          <div className={`${styles.heroTitle}`}>
            <img draggable='false' src={'./fullstack-app-title.png'} alt='serverless-fullstack-application' />
          </div>
          <div className={`${styles.heroDescription}`}>
          Aplicación sin servidor en GCP con Cloud Build, Storage, Kubernetes y pruebas automatizadas con Jenkins
          </div>
          { /* Call To Action */}

          <div className={`${styles.containerCta}`}>

            <Link to='/public/users/register'>
              <button className={`buttonPrimaryLarge`}>
                Registro
              </button>
            </Link>

            <Link to='/public/users/login' className={`${styles.linkSignIn}`}>Iniciar Sesion</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
