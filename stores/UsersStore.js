import {
    observable,
    action,
    computed,
} from 'mobx';

import Api from '../Api';

class UsersStore {
    @observable nearbyUsers = [];

    @action async refreshNearbyUsers() {
        return new Promise((resolve, reject) => {
            Api.getNearbyUsers().then(res => {
                this.nearbyUsers = res;
                resolve();
            });
        })
    }
}

const usersStore = new UsersStore();
export default usersStore;
