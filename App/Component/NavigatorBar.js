import React, {
    Component,
    StyleSheet,
    PropTypes,
    StatusBar,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigatorStyles } from '../Common/Styles';

export default class NavigatorBar extends Component {
    static defaultProps = {
        title: '',
    }
    
    static propTypes = {
        title: PropTypes.string,
    }
    
    constructor(props) {
        super(props);
    }
    
    render() {
        StatusBar.setBarStyle('light-content', true);
        return (
            <View style={NavigatorStyles.navigatorBar}>
                <TouchableOpacity onPress={()=> this.props.navigator.pop()} style={{flexDirection: 'row'}}>
                    <Icon name='chevron-left' color='#FFF' size={20} />
                    <Text style={{color: '#FFF', fontSize: 18, marginLeft: 10, }}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

