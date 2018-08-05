import React from 'react';

import TabNavigator from './navigators/TabNavigator';

import 'es6-symbol/implement';

import { Provider } from 'mobx-react';

import * as stores from './stores';

export default class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <TabNavigator />
            </Provider>
        );
    }
}
