/**
 * Created by jakes on 4/16/16.
 */
 'use strict';


import React, {
    Component,
    StyleSheet,
    View,
    Text,
    TabBarIOS
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../Common/Color';

import Home from './TabView/Home.js';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }

    _renderContent() {
        return <Home />;
    }

    render() {
        return (
            <TabBarIOS
                tintColor={Color.tabBarColor.tabColor}
                barTintColor={Color.tabBarColor.tabBgColor}
                style={{backgroundColor:'#F6F6F6'}}
                >
                <Icon.TabBarItem
                    name="home"
                    title="首页"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    selected={this.state.selectedTab === 'home'}
                    onPress={()=> {
                        this.setState({
                            selectedTab: 'home'
                        });
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
                        this.setState({
                            selectedTab: 'order'
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
                        this.setState({
                            selectedTab: 'me'
                        });
                    }}>
                    {this._renderContent()}
                </Icon.TabBarItem>
            </TabBarIOS>
        )
    }
}
