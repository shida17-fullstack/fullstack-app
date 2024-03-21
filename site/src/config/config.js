import localConfig from './config.local';
import prodConfig from './config.prod';

const config = process.env.NODE_ENV === 'production' ? prodConfig : localConfig;

export default config;
