import React from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    connect
} from 'react-redux';

import {
    getNearbyUsers
} from '../actions/usersActions';

import Spinner from 'react-native-loading-spinner-overlay';

import DiscoverList from '../components/discover/DiscoverList';

import renderIf from '../utils/renderIf';
import Colors from '../Colors';

class TestScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usersLoaded: false,
            showNoUsersNearbyMsg: false
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>:D</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
});

const mapStateToProps = state => {
    return {
        nearbyUsers: state.users.nearbyUsers
    }
}

export default connect(mapStateToProps)(TestScreen);
