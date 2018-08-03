import React from 'react';

import { createStackNavigator } from 'react-navigation';

import DiscoverScreen from '../screens/DiscoverScreen';

export default createStackNavigator({
    Discover: DiscoverScreen,
},
{
    initialRouteName: 'Discover'
});
