import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

// Páginas / Telas
import PageIndex from './pages/index';
import PageNote from './pages/note';

const AppNavigator = createStackNavigator({
    Home: PageIndex,
    Note: PageNote
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#4B0CE8',
        },
        headerTintColor: '#fff'
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;