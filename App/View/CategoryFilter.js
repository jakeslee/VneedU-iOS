import React, {
    Component,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import Base from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import RequirementItem from '../Component/RequirementItem';

import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';

export default class CategoryFilter extends Component {
    constructor(props) {
        super(props);
        
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        
        var test = [];
        for (var i = 0; i < 6 ; ++i)
            test.push({
                title: '帮忙搬家具',
                description: '最近新购入了一些家具，但是厂家不提供搬家服务，得自己搬。家具有点多，希望请些人来帮忙。',
                publisher: {
                    id: '[UUID]',
                    name: 'Jakes Lee',
                    avatar: require('../Resources/Images/avatar.png'),
                },
                category: {
                    id: '[UUID]',
                    name: '施工',
                    type: 'build',
                },
                area: '贵阳',
                price: '10000',
                payMethod: 2,
                image: null,
                nice: 9,
                datetime: '2016-4-21 9:00',
                images: [],
                comments: 0,
            });
        
        this.state = {
            dataSource: dataSource.cloneWithRows(test),
        }
    }
    
    _renderRow(rowData) {
        return (
            <RequirementItem {...rowData} />
        )
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='施工需求' {...this.props} />
                {/* Requirements area start */}
                <View style={styles.requirementArea}>
                    <ListView 
                        style={{paddingTop: 5,}}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow} />
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
