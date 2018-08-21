import React from 'react';

import {
    FlatList,
    Image,
    Text,
    StyleSheet,
    View
} from 'react-native';

import {
    withNavigation
} from 'react-navigation';

import {
    connect
} from 'react-redux';

import {
    getNearbyUsers
} from '../../actions/usersActions';

import {
    FontAwesome
} from '@expo/vector-icons';

import renderIf from '../../utils/renderIf';


// Margin between cards and screen limits
const cardMargin = 8;

class Discover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: false,
            page: 1
        }
    }


    _renderItem = ({item, index}) => {
        let cardMarginStyle;

        if (index % 2 == 0) { // Card on right
            cardMarginStyle = {marginRight: cardMargin / 2};
        } else { // Card on left
            cardMarginStyle = {marginLeft: cardMargin / 2};
        }

        return (
            <View style={[styles.card, cardMarginStyle]}>
                <View style={styles.cardPhotoContainer}>
                    <Image
                        style={styles.cardPhoto}
                        resizeMode='cover'
                        source={{uri: item.photo}}
                      />
                </View>

                <View style={styles.cardInfoContainer}>
                    <View style={styles.nameContainer}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.infoText}>{item.name}</Text>
                        <Text style={styles.infoText}>, {item.age}</Text>
                        {renderIf(false, // TODO: Return user online status from api
                            <FontAwesome name='circle' size={10} style={styles.onlineIcon} />
                        )}
                    </View>

                    <View style={styles.distanceContainer}>
                        <Text style={styles.infoText}>{item.distance} km</Text>
                    </View>
                </View>

            </View>
        );
    };

    _keyExtractor = (item, index) => index.toString();

    /*_onPress = (id) => {
        this.props.navigation.navigate('Detail', {'eventId': id});
    }*/

    _setIsRefreshing(refreshing) {
        this.setState({
            isRefreshing: refreshing
        })
    }

    _getNextPage() {
        const nextPage = this.state.page + 1;

        this.setState({
            page: nextPage
        });

        return this.props.dispatch(getNearbyUsers(nextPage));
    }

    render() {
        return (
            <FlatList
                data={this.props.nearbyUsers}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                numColumns={2}
                contentContainerStyle={styles.listContentContainer}
                onEndReachedThreshold={1}
                onEndReached={() => this._getNextPage()}
                onRefresh={() => {
                    this._setIsRefreshing(true);
                    this.props.dispatch(getNearbyUsers(1)).then(() => {
                        this._setIsRefreshing(false);
                    });
                }}
                refreshing={this.state.isRefreshing}
            />
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1.05,
        borderRadius: 10,
        marginBottom: cardMargin,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
        overflow: 'hidden'
    },
    cardPhoto: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    cardPhotoContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    cardInfoContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingLeft: 16,
        paddingRight: 16,
    },
    distanceContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 14
    },
    listContentContainer: {
        padding: cardMargin,
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    onlineIcon: {
        color: '#59e24b',
        marginLeft: 5
    }
});


const mapStateToProps = state => {
    return {
        nearbyUsers: state.users.nearbyUsers,
    }
}


export default connect(mapStateToProps)(withNavigation(Discover));
