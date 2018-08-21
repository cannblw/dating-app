import {
    ADD_USERS_TO_NEARBY_USERS_LIST,
    REFRESH_NEARBY_USERS_LIST,
} from '../actions/actionTypes';

initialState = {
    nearbyUsers: [],
    hasErrorsFetchingNearbyUsers: true
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USERS_TO_NEARBY_USERS_LIST:
            return { ...state, nearbyUsers: state.nearbyUsers.concat(action.payload.users) }
            break;
        case REFRESH_NEARBY_USERS_LIST:
            return { ...state, nearbyUsers: action.payload.users }
            break;
        default:
          return state;
    }
}

export default usersReducer;
