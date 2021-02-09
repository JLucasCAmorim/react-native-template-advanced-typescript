import React, {FC} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './routes';
import './config/reactotron';

const App: FC = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
