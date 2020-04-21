import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

declare global {
  interface Console {
    tron: any;
  }
}

if (process.env.NODE_ENV === 'development') {
  console.tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(sagaPlugin({except: ['']}))
    .connect();

  if (console.tron) {
    console.tron.clear!();
  }
}
