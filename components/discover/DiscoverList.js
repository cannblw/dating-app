import React from 'react';

import {
    FlatList,
    Image,
    StyleSheet
} from 'react-native';

import {
    Body,
    CardItem,
    Text,
    View
} from 'native-base';

import {
    withNavigation
} from 'react-navigation';

import {
    FontAwesome
} from '@expo/vector-icons';

import renderIf from '../../utils/renderIf';


// Margin between cards and screen limits
const cardMargin = 8;

class Discover extends React.Component {
    constructor(props) {
        super(props);

        // TODO: Change hardcoded data to api call
       this.users = [
           {
               id: 1,
               name: 'Agustín Rodriguez',
               gender: 'male',
               age: 19,
               distance: 2,
               online: true
           },
           {
               id: 2,
               name: 'María Santos',
               gender: 'female',
               age: 20,
               distance: 4,
               online: false
           },
           {
               id: 3,
               name: 'La rebehh',
               gender: 'female',
               age: 18,
               distance: 7,
               online: true
           },
           {
               id: 4,
               name: 'La rebehh',
               gender: 'female',
               age: 18,
               distance: 7,
               online: true
           },
           {
               id: 5,
               name: 'La rebehh',
               gender: 'female',
               age: 18,
               distance: 7,
               online: false
           },
           {
               id: 6,
               name: 'La rebehh',
               gender: 'female',
               age: 18,
               distance: 7,
               online: false
           }
       ];
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
                            source={{uri: 'https://images.pexels.com/photos/582039/pexels-photo-582039.jpeg?auto=compress&cs=tinysrgb&h=350'}}
                          />
                    </View>

                    <View style={styles.cardInfoContainer}>
                        <View style={styles.nameContainer}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.infoText}>{item.name}</Text>
                            <Text style={styles.infoText}>, {item.age}</Text>
                            {renderIf(item.online,
                                <FontAwesome name='circle' size={10} style={styles.onlineIcon} />
                            )}
                        </View>

                        <View style={styles.distanceContainer}>
                            <Text style={styles.infoText}>{item.distance} km</Text>
                        </View>
                    </View>

                </View>

        )
    }

    _keyExtractor = (item, index) => index.toString()

    /*_onPress = (id) => {
        this.props.navigation.navigate('Detail', {'eventId': id});
    }*/

    render() {
        this.lastIndex = this.users.length - 1;

        return (
            <FlatList
                data={this.users}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                numColumns={2}
                contentContainerStyle={styles.listContentContainer}
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


export default withNavigation(Discover);
