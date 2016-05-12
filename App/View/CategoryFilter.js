import React, {Component} from "react";
import {StyleSheet, TextInput, ListView, ScrollView, RefreshControl, TouchableOpacity, InteractionManager, ActivityIndicatorIOS, Image, View, Text} from "react-native";
import { connect, provide } from 'react-redux';

import { Base } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import RequirementItem from '../Component/RequirementItem';
import { load_new_requirements, request_requirement } from '../Redux/Actions/RequirementAction';
import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';

class CategoryFilter extends Component {
    constructor(props) {
        super(props);
        
        this._onRefresh = this._onRefresh.bind(this);
    }
    
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._onRefresh();
        });
    }
    
    _onRefresh() {
        console.log('on refresh');
        this.props.dispatch(load_new_requirements(this.props.category, 1));
    }
    
    _renderRow(rowData) {
        return (
            <RequirementItem {...rowData}/>
        )
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='施工需求' {...this.props} />
                {/* Requirements area start */}
                <View style={styles.requirementArea}>
                    <ScrollView style={styles.contentContainer} 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.requirement[this.props.category].isFetching}
                                onRefresh={this._onRefresh}
                                tintColor="#ff0000" 
                                title="Loading..."
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="transparent"/>
                        }
                        contentContainerStyle={{paddingVertical: 5}} 
                        automaticallyAdjustContentInsets={false} >
                        {this.props.requirement[this.props.category].items.length == 0 ? 
                            <TouchableOpacity onPress={()=> {
                                console.log(this.props.requirement[this.props.category].isFetching)
                            }}>
                            <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: '#bbb'}}>该分类目前没有需求！</Text>
                            </View></TouchableOpacity>:
                        <ListView 
                            dataSource={this.props.requirement[this.props.category].dataSource}
                            renderRow={this._renderRow.bind(this)} />}
                    </ScrollView>
                </View>
                {/* Requirements area end */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // Requirements area
    requirementArea: {
        flex: 1,
        borderTopColor: '#d8d8d8', 
        borderTopWidth: 0.5, 
    },
});

export default connect(({app, requirement})=>({app, requirement}))(CategoryFilter);
