import {
    ADD_USERS_TO_NEARBY_USERS_LIST,
    REFRESH_NEARBY_USERS_LIST,
    UPDATE_HAS_ERROR_NEARBY_USERS
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

// THUNKS
export const getNearbyUsers = page => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const nearbyUsers = Api.fetchNearbyUsers(page).then(users => {
                if (page == 1) {
                    dispatch(refreshNearbyUsersList(users));
                } else {
                    dispatch(addUsersToNearbyUsersList(users));
                }

                resolve(users);
            }).catch(e => {
                reject('Error getting nearby users: e.message');
            });
        })

    }
}
