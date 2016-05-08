import React, { Component, PropTypes } from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from "react-native";

import moment from 'moment';
import localeZh from 'moment/locale/zh-cn';
import { BorderStyles, ImageStyles } from '../Common/Styles';

moment.locale('zh-cn', localeZh);

export default class CommentItem extends Component {
    static defaultProps = {
        relatedTime: false,
    }
    
    static propTypes = {
        rowData: PropTypes.shape({
            id: PropTypes.string,
            content: PropTypes.string,
            area: PropTypes.string,
            score: PropTypes.number,
            avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            datetime: PropTypes.string,
        }).isRequired,
        relatedTime: PropTypes.bool,
    }
    
    render() {
        let datetime = this.props.relatedTime ? 
                        moment(this.props.rowData.datetime, 'YYYY-MM-DD HH:mm:ss').fromNow()
                        : this.props.rowData.datetime;
        return (
            <View style={[BorderStyles.top, {flexDirection: 'row', padding: 10, alignItems: 'center'}]}>
                <View style={ImageStyles.avatarRound(31)}>
                    <Image style={{width: 31, height: 31}} source={this.props.rowData.avatar}/>
                </View>
                <View style={{marginLeft: 10, flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1, color: '#323231'}}>
                            来自{this.props.rowData.area}的用户
                        </Text>
                        <Text style={{color: '#6F6F6F', fontSize: 12}}>
                            {datetime}
                        </Text>
                    </View>
                    <Text style={{marginTop: 5}}>
                        {this.props.rowData.content}
                    </Text>
                </View>
            </View>
        )
    }
}
