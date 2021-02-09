import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

declare global {
  interface Console {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tron: any;
  }
}

if (__DEV__) {
  console.tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(sagaPlugin({except: ['']}))
    .useReactNative()
    .connect();

  if (console.tron) {
    console.tron.setAsyncStorageHandler(AsyncStorage);
    console.tron.clear?.();
  }
}
