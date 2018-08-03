import React from 'react';

import {
    StyleSheet,
    View
} from 'react-native';

import {
    Container,
    Content,
    Text
} from 'native-base';

import DiscoverList from '../components/discover/DiscoverList';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <View style={styles.listContainer}>
                        <DiscoverList />
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
