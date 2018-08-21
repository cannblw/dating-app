import {
    ADD_USERS_TO_NEARBY_USERS_LIST,
    REFRESH_NEARBY_USERS_LIST,
    SET_HAS_LOADED_ALL_NEARBY_USERS
} from './actionTypes';

import Api from '../Api';

export const addUsersToNearbyUsersList = users => {
    return {
        type: ADD_USERS_TO_NEARBY_USERS_LIST,
        payload: {
            users: users
        }
    }
}

export const refreshNearbyUsersList = users => {
    return {
        type: REFRESH_NEARBY_USERS_LIST,
        payload: {
            users: users
        }
    }
}

export const setHasLoadedAllNearbyUsers = status => {
    return {
        type: SET_HAS_LOADED_ALL_NEARBY_USERS,
        payload: {
            status: status
        }
    }
}

// THUNKS
export const getNearbyUsers = page => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const nearbyUsers = Api.fetchNearbyUsers(page).then(users => {
                if (users == undefined) {
                    console.log('HAS LOADED ALL USERS')
                    return dispatch(setHasLoadedAllNearbyUsers(true));
                }

                console.log('LOADING USERS')

                dispatch(addUsersToNearbyUsersList(users));
                resolve(users);
            }).catch(e => {
                reject(new Error('Error getting nearby users: ' + e.message));
            });
        });
    }
}

export const refreshNearbyUsers = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const nearbyUsers = Api.fetchNearbyUsers(1).then(users => {
                dispatch(setHasLoadedAllNearbyUsers(false));
                dispatch(refreshNearbyUsersList(users));
                resolve(users);
            }).catch(e => {
                reject(new Error('Error getting nearby users: ' + e.message));
            });
        });
    }
}
