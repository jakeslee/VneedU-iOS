/**
 * Created by jakes on 4/16/16.
 */
 'use strict';

import React, {
    Component,
    StyleSheet,
    StatusBar,
    View,
    Text,
    TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Color from '../Common/Color';
import HeaderBar from '../Component/HeaderBar';
import Home from './TabView/Home';
import Order from './TabView/Order';
import Me from './TabView/Me';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            showTopBar: true,
        }
    }

    _renderContent() {
        switch(this.state.selectedTab) {
            case 'home':
                return <Home {...this.props} />;
            case 'order':
                return <Order {...this.props} />;
            case 'me':
                return <Me {...this.props} />;
            default:
                return <Home {...this.props} />;
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>  
                <TabBarIOS
                    tintColor={Color.tabBarColor.tabColor}
                    barTintColor={Color.tabBarColor.tabBgColor}
                    style={[styles.tabContainer, {top: this.state.showTopBar ? 56 : 0}]}
                    >
                    <Icon.TabBarItem
                        name="home"
                        title="首页"
                        iconName="ios-home-outline"
                        selectedIconName="ios-home"
                        selected={this.state.selectedTab === 'home'}
                        onPress={()=> {
                            this.setState({
                                selectedTab: 'home',
                                showTopBar: true,
                            });
                            StatusBar.setBarStyle('default', true);
                        }} >
                        {this._renderContent()}
                    </Icon.TabBarItem>
                    <Icon.TabBarItem
                        name="order"
                        title="订单"
                        iconName="ios-list-outline"
                        selectedIconName="ios-list"
                        selected={this.state.selectedTab === 'order'}
                        onPress={()=> {
                            StatusBar.setBarStyle('default', true);
                            this.setState({
                                selectedTab: 'order',
                                showTopBar: true,
                            });
                        }}>
                        {this._renderContent()}
                    </Icon.TabBarItem>
                    <Icon.TabBarItem
                        name="me"
                        title="我"
                        iconName="ios-person-outline"
                        selectedIconName="ios-person"
                        selected={this.state.selectedTab === 'me'}
                        onPress={()=> {
                            StatusBar.setBarStyle('light-content', true);
                            this.setState({
                                selectedTab: 'me',
                                showTopBar: false,
                            });
                        }}>
                        {this._renderContent()}
                    </Icon.TabBarItem>
                </TabBarIOS>
                {(()=> {
                    if (this.state.showTopBar) {
                        return <HeaderBar style={styles.topBar} {...this.props}/>;
                    }
                })()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        position:'absolute', 
        top: 0, 
        left: 0
    },
    tabContainer: {
        backgroundColor:'#F6F6F6',
        position:'absolute', 
        left: 0,
        bottom: 0,
        right: 0,
    },
});
