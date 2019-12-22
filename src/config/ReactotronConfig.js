import Reactotron from 'reactotron-react-native';

import { NativeModules, AsyncStorage } from 'react-native';

if (__DEV__) {
  const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

  const tron = Reactotron.configure({ host })

    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
