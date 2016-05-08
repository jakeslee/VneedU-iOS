'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';

import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Scene } from 'react-native-router-flux';

import App from './App/Redux/App';
import redusers from './App/Redux/Reducers';

const Middlewares = [thunkMiddleware];

const store = compose(
    applyMiddleware(...Middlewares)
)(createStore)(redusers);

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
import UserInfo from './App/View/UserInfo';
import RequirementDetail from './App/View/RequirementDetail';
import AddRequirement from './App/View/AddRequirement';

class vneedu extends Component {
    render() {
        return (
            <Provider store={store}>
                <App>
                    <Scene key='root' hideNavBar={true}>
                        <Scene key='main' component={Main} title='首页' initial={true}/>
                        <Scene key='login' component={Login} title='登录'/>
                        <Scene key='register' component={Register} title='注册'/>
                        <Scene key='about' component={About} title='关于'/>
                        <Scene key='setting' component={Setting} title='设置'/>
                        <Scene key='password_reset' component={PasswordReset} title='重设密码'/>
                        <Scene key='info_modify' component={InfoModify} title='信息修改'/>
                        <Scene key='category_filter' component={CategoryFilter} title='分类检索'/>
                        <Scene key='judgement' component={Judgement} title='评价'/>
                        <Scene key='search' component={Search} title='搜索'/>
                        <Scene key='order_detail' component={OrderDetail} title='订单信息'/>
                        <Scene key='user_info' component={UserInfo} title='用户信息'/>
                        <Scene key='requirement_detail' component={RequirementDetail} title='需求详情'/>
                        <Scene key='add_requirement' component={AddRequirement} title='增加需求'/>
                    </Scene>
                </App>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('vneedu', () => vneedu);
