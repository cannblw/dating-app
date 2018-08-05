import React from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';

import {
    inject,
    observer,
} from 'mobx-react';

import {
    Container,
    Content,
    Text
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

import DiscoverList from '../components/discover/DiscoverList';

import Colors from '../Colors';

@inject('usersStore') @observer
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        const { usersStore } = this.props;

        this.state = {
            usersLoaded: false
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
    }

    render() {
        const { usersStore } = this.props;

        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <View style={styles.listContainer}>
                        <Spinner visible={!this.state.usersLoaded} color={Colors.PINK} overlayColor='rgba(0,0,0,0)' />
                        <DiscoverList users={usersStore.nearbyUsers} />
                    </View>
                </Content>
            </Container>
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
    }
});
