import React, {Component} from "react";
import {StyleSheet, TextInput, TouchableOpacity, Image, View, Text, AlertIOS} from "react-native";
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Base, avatar_process } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, InputStyles, ImageStyles } from '../Common/Styles';

import {
    post_judgement,
} from '../Redux/Actions/OrderAction';

class Judgement extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            star: 4,
            avatar: null,
            content: '',
        }
    }
    
    componentDidMount() {
        let avatar;
        if (this.props.cur == 0)
            avatar = avatar_process(this.props.order.user.avatar, this.props.app.cdn_config);
        else
            avatar = avatar_process(this.props.order.creator.avatar, this.props.app.cdn_config);
            
        this.setState({avatar,});
    }
    
    render() {
        var ratingText, commentPlace = '提一些建议，帮助他做得更好';
        if (this.state.star > 4.5)
            ratingText = '极好';
        else if (this.state.star > 3.5)
            ratingText = '好';
        else if (this.state.star > 2.5)
            ratingText = '一般';
        else if (this.state.star > 1.5)
            ratingText = '差';
        else
            ratingText = '极差';
            
        if (this.state.star < 2.5)
            commentPlace = '说说哪里做的不好，帮助他改进';
        
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='评价' {...this.props} />
                <Spinner visible={this.props.user.judgements.isPosting}/>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={()=> Actions.requirement_detail({id: this.props.order.requirement.id})}>
                        <View style={[BorderStyles.topAndBottom,  styles.rqInfoArea]}>
                            <View style={[ImageStyles.avatarRound(45), {width: 45}]}>
                                <Image style={ImageStyles.avatarRound(45)} source={this.state.avatar}/>
                            </View>
                            <Text style={styles.rqInfoTitle}>{this.props.order.requirement.title}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[BorderStyles.topAndBottom, styles.judgementArea]}>
                        <View style={styles.ratingStar}>
                            <Text style={{fontSize: 16, marginRight: 10}}>总体评价</Text>
                            <StarRating selectedStar={(rating)=> this.setState({star: rating})} 
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                starColor='#D3E02E'
                                starSize={25}
                                maxStars={5}
                                rating={this.state.star} />
                            <Text style={styles.ratingText}>{ratingText }</Text>
                        </View>
                        <TextInput multiline={true} placeholder={commentPlace} 
                            value={this.state.content} onChangeText={(content)=> this.setState({content,})}
                            style={styles.judgementComment} />
                    </View>
                    
                    <View style={styles.bottomBar}>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <Text style={{color: '#FFF'}}>评价后可获得 <Text style={{color: '#6AD072'}}>130</Text> 积分</Text>
                            <Text style={{color: '#B1B1B1', fontSize: 12}}>积分说明</Text>
                        </View>
                        <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                            <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: 70, paddingVertical: 8}]}
                                onPress={()=> {
                                    if (this.state.content.length < 2) {
                                        AlertIOS.alert('错误', '评价至少2字！');
                                        return;
                                    }
                                    
                                    this.props.dispatch(
                                        post_judgement(this.props.order.id, 
                                                       this.state.content, 
                                                       this.state.star,
                                                       this.props.currentUser.user));
                                }}>
                                <Text style={ButtonStyles.primaryBtnText}>评价</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rqInfoArea: {
        marginTop: 10, 
        backgroundColor: '#FFF', 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 12
    },
    rqInfoTitle: {
        marginLeft: 10, 
        fontSize: 18, 
        color: '#262626'
    },
    judgementArea: {
        marginTop: 10, 
        backgroundColor: '#FFF', 
        padding: 12
    },
    ratingStar: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 5
    },
    ratingText: {
        fontSize: 14, 
        color: '#7B7C7C', 
        textAlign: 'right', 
        flex: 1
    },
    judgementComment: {
        backgroundColor: '#F7F3F3', 
        borderColor: '#C2C2C2', 
        borderWidth: 0.5, 
        borderRadius: 3, 
        height: 50, 
        fontSize: 14, 
        paddingHorizontal: 5, 
        paddingVertical: 2
    },
    bottomBar: {
        flexDirection: 'row', 
        backgroundColor: '#3F3F3F', 
        alignItems: 'center', 
        padding: 8, 
        position: 'absolute', 
        left: 0, 
        bottom: 0, 
        right: 0
    },
});

export default connect(({app, currentUser, user})=>({
    user,
    app, 
    currentUser
}))(Judgement);
