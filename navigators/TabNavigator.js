import React from 'react';

import { createBottomTabNavigator } from 'react-navigation';

import DiscoverNavigator from './DiscoverNavigator';

import TestScreen from '../screens/TestScreen';

import { Ionicons } from '@expo/vector-icons';

export default createBottomTabNavigator({
    Discover: DiscoverNavigator,
    Test: TestScreen
},
{
    initialRouteName: 'Discover',

    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
            const { routeName } = navigation.state;
            let iconName;

            if (routeName === 'Discover') {
                iconName = 'md-compass';
            } else if (routeName === 'Settings') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }

            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
    }),

    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    }
});
