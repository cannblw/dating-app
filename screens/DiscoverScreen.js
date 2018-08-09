import React from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    inject,
    observer,
} from 'mobx-react';

import Spinner from 'react-native-loading-spinner-overlay';

import DiscoverList from '../components/discover/DiscoverList';

import renderIf from '../utils/renderIf';
import Colors from '../Colors';

@inject('usersStore') @observer
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        const { usersStore } = this.props;

        this.state = {
            usersLoaded: false,
            showNoUsersNearbyMsg: false
        }

        // If no nearby users loaded
        if (usersStore.nearbyUsers.length == 0) {
            usersStore.refreshNearbyUsers().then(() => {
                // Users loaded in usersStore.nearbyUsers
                setTimeout(() => {
                    this.setState({ usersLoaded: true })
                }, 1);
            });
        }

        // Show "No nearby users found" message on timeout
        setTimeout(() => {
            if (usersStore.nearbyUsers.slice().length == 0) {
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
