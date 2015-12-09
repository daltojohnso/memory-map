import webpack           from 'webpack';
import config            from '../../config';
import webpackConfig     from './_base';
import frontendConfig from './development_hot';

let backendConfig = {
  entry: './src/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'backend.js'
  }
}

export default [frontendConfig, backendConfig];
