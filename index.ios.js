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

class vneedu extends Component {
    
    constructor() {
        super();
        this.state = {
            splashed: false,
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
            case 'main': 
                return <Main navigator={navigator} />;
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
