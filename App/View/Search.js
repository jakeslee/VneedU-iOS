import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    ListView,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';

import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles } from '../Common/Styles';

export default class Search extends Component {
    constructor(props) {
        super(props);
        
        var hotSearchDS = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> r1 !== r2,
        });
        
        var historyDS = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> r1 !== r2,
        });
        
        this.state = {
            hotSearchDS: hotSearchDS.cloneWithRows(['代购iphone', '搬家', 'iKBC', 'IDCF', '搬家']),
            historySearchDS: historyDS.cloneWithRows(['代购iphone', '搬家', 'iKBC', 'IDCF', '搬家']),
        }
    }
    
    _renderHotSearch(rowData) {
        return (
            <View style={{borderColor: '#3483D3', borderWidth: 0.5, borderRadius: 3, paddingHorizontal: 10, height: 28, marginRight: 10, marginBottom: 10, }}>
                <Text style={{fontSize: 16, textAlign: 'center', color: '#3483D3', fontWeight: '300', lineHeight: 22 }}>
                    {rowData}
                </Text>
            </View>
        )
    }
    
    _renderHistorySearch(rowData) {
        return (
            <View style={{borderBottomColor: '#C0BEBE', borderBottomWidth: 0.5, padding: 10,}}>
                <Text style={{fontSize: 16, color: '#4E4E4E', fontWeight: '400', lineHeight: 22 }}>
                    {rowData}
                </Text>
            </View> 
        )
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar enableSearchBar={true} searchBarText='请输入需求的关键字或名称' 
                    onSubmit={(text)=> console.log(text)} {...this.props} />
                <View style={{marginTop: 10, flex: 1,}}>
                    <ScrollView bounces={false} automaticallyAdjustContentInsets={false}>
                        <Text style={{fontSize: 18, color: '#4E4E4E', marginHorizontal: 20, marginVertical: 10}}>
                            热门搜索
                        </Text>
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', padding: 10, paddingBottom: 0,}]}>
                            <ListView renderRow={this._renderHotSearch} dataSource={this.state.hotSearchDS} 
                                contentContainerStyle={{flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}} />
                        </View>
                        <Text style={{fontSize: 18, color: '#4E4E4E', marginHorizontal: 20, marginVertical: 10}}>
                            搜索历史
                        </Text>
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', paddingHorizontal: 10,}]}>
                            <ListView renderRow={this._renderHistorySearch} dataSource={this.state.historySearchDS} 
                                contentContainerStyle={{flexDirection: 'column'}} />
                            <TouchableOpacity style={{marginVertical: 10}}>
                                <Text style={{textAlign: 'center', fontSize: 16, color: '#3483D3', paddingVertical: 10}}>清空搜索记录</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
