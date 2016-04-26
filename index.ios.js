'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';

import SplashScreen from './App/View/SplashScreen';
import Main from './App/View/Main';
import Login from './App/View/Login';
import Register from './App/View/Register';
import About from './App/View/About';
import Setting from './App/View/Setting';
import PasswordReset from './App/View/PasswordReset';
import InfoModify from './App/View/InfoModify';
import CategoryFilter from './App/View/CategoryFilter';
import Judgement from './App/View/Judgement';
import Search from './App/View/Search';
import OrderDetail from './App/View/OrderDetail';

class vneedu extends Component {
    constructor() {
        super();
        this.state = {
            splashed: true,
        }
    }
    
    componentDidMount() {
        this.timer = setTimeout(()=>{
            this.setState({
                splashed: true,
            });
        }, 2000);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    renderScene(route, navigator) {
        switch (route.name) {
            case 'about':
                return <About navigator={navigator} />;
            case 'main': 
                return <Main navigator={navigator} />;
            case 'category_filter': 
                return <CategoryFilter navigator={navigator} />;
            case 'login':
                return <Login navigator={navigator} />;
            case 'register':
                return <Register navigator={navigator} />;
            case 'setting':
                return <Setting navigator={navigator} />;
            case 'password_reset':
                return <PasswordReset navigator={navigator} />;
            case 'info_modify':
                return <InfoModify navigator={navigator} />;
            case 'judgement':
                return <Judgement navigator={navigator} />;
            case 'search':
                return <Search navigator={navigator} />;
            case 'order_detail':
                return <OrderDetail navigator={navigator} />;
                
            // This should have StoryScreen
            default:
                return <SplashScreen />;
        }
    }
    
    render() {
        if (this.state.splashed){
            return (
                <Navigator
                    initialRoute={{name: 'main'}}
                    renderScene={this.renderScene}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromRight} />
            );
        } else {
            return <SplashScreen />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('vneedu', () => vneedu);
