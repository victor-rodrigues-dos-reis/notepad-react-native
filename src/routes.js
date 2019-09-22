import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

// Páginas / Telas
import PageMain from './pages/main';
import PageNote from './pages/note';

const AppNavigator = createStackNavigator({
    Home: PageMain,
    Note: PageNote
},{
    initialRoute: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f00',
        },
        headerTintColor: '#ddd'
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;