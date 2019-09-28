import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

// Páginas / Telas
import PageIndex from './pages/index';
import PageNote from './pages/note';

// Criando as rotas
const AppNavigator = createStackNavigator({
    Home: PageIndex,
    Note: PageNote
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#4B0CE8', // Muda a cor de background do navigation header
        },
        headerTintColor: '#fff' // Muda a cor do texto no navigation header
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;