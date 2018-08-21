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

class DiscoverScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersLoaded: false,
            showNoUsersNearbyMsg: false
        }

        // If no nearby users loaded
        if (this.props.nearbyUsers.length == 0) {
            this.props.dispatch(getNearbyUsers(1)).then(() => {
                // Users loaded in this.props.nearbyUsers
                setTimeout(() => {
                    this.setState({ usersLoaded: true })
                }, 1);
            });
        }

        // Show "No nearby users found" message on timeout
        setTimeout(() => {
            if (this.props.nearbyUsers.length == 0) {
                setTimeout(() => {
                    this.setState({
                        usersLoaded: true,
                        showNoUsersNearbyMsg: true
                    })
                }, 1);
            }
        }, 10000); // 10 seconds timeout
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    {renderIf(this.state.showNoUsersNearbyMsg,
                        <Text style={styles.noUsersNearbyText}>No users nearby...</Text>
                    )}

                    <Spinner visible={!this.state.usersLoaded} color={Colors.PINK} overlayColor='rgba(0,0,0,0)' />
                    <DiscoverList />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    listContainer: {
        width: '100%',
    },
    noUsersNearbyText: {
        color: '#7c7c7c',
        marginLeft: 16,
        marginTop: 16
    }
});

const mapStateToProps = state => {
    return {
        nearbyUsers: state.users.nearbyUsers,
    }
}

export default connect(mapStateToProps)(DiscoverScreen);
