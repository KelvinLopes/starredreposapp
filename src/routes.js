import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Main from './pages/Main';

const Routes = createAppContainer (

  createStackNavigator (
    {
      Main,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          background: '#000',
        },
        headerTinColor: '#blue',
      },
    }
  )
);

export default Routes;
