import {
    ADD_USERS_TO_NEARBY_USERS_LIST,
    REFRESH_NEARBY_USERS_LIST,
    SET_HAS_LOADED_ALL_NEARBY_USERS
} from '../actions/actionTypes';

initialState = {
    nearbyUsers: [],
    hasLoadedAllNearbyUsers: false
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USERS_TO_NEARBY_USERS_LIST:
            return { ...state, nearbyUsers: state.nearbyUsers.concat(action.payload.users) }
            break;
        case REFRESH_NEARBY_USERS_LIST:
            return { ...state, nearbyUsers: action.payload.users }
            break;
        case SET_HAS_LOADED_ALL_NEARBY_USERS:
            return { ...state, hasLoadedAllNearbyUsers: action.payload.status }
            break;
        default:
          return state;
    }
}

export default usersReducer;
