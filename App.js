import React from 'react';

import TabNavigator from './navigators/TabNavigator';

import 'es6-symbol/implement';

import { createStore, applyMiddleware } from 'redux'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TabNavigator />
            </Provider>
        );
    }
}
