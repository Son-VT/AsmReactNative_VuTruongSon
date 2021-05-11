/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './screens/App';
import {name as appName} from './app.json';
import Login from './screens/Login';
import Products from './screens/Products';
import RealtimeDatabase from './screens/RealtimeDatabase';

AppRegistry.registerComponent(appName, () => App);
