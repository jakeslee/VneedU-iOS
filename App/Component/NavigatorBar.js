import React, { Component, PropTypes } from 'react';
import {StyleSheet, StatusBar, TextInput, TouchableOpacity, View, Text} from "react-native";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Ionicons';
import { NavigatorStyles } from '../Common/Styles';

export default class NavigatorBar extends Component {
    static defaultProps = {
        title: '',
        enableSearchBar: false,
        searchBarText: '',
        onSubmit: (v)=>{},
    }
    
    static propTypes = {
        title: PropTypes.string,
        enableSearchBar: PropTypes.bool,
        searchBarText: PropTypes.string,
        onSubmit: PropTypes.func,
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.title !== this.props.title;
    }
    
    render() {
        return (
            <View style={[NavigatorStyles.navigatorBar, {flexDirection: 'row'}]}>
                <StatusBar 
                    animated={false}
                    barStyle='light-content'/>
                <TouchableOpacity onPress={()=> {Actions.pop(); Actions.refresh(); }} style={{flexDirection: 'row'}}>
                    <Icon name='chevron-left' color='#FFF' size={20} style={{paddingRight: 10}} />
                    {this.props.enableSearchBar ? null :
                    <Text style={{color: '#FFF', fontSize: 18, }}>{this.props.title}</Text>}
                </TouchableOpacity>
                {this.props.enableSearchBar ?
                <View style={styles.inputArea}>
                    <Icon name='ios-search' color='#A6A3A3' size={20}/>
                    <TextInput style={styles.input} placeholder={this.props.searchBarText} 
                        onSubmitEditing={(event)=> this.props.onSubmit(event.nativeEvent.text)} /> 
                </View>: null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputArea: {
        borderRadius: 5,
        backgroundColor: '#FFF',
        marginLeft: 5,
        marginRight: 15,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        height: 30,
        fontSize: 15,
        flex: 1,
    }
});

