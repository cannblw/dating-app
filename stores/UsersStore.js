import {
    observable,
    action,
    computed,
} from 'mobx';

import Api from '../Api';

class UsersStore {
    /*
     * NEARBY USERS
     */
    @observable nearbyUsers = [];
    nearbyUsersCurrentPage = 1;
    hasLoadedAllNearbyUsers = false;
    isFetchingNearbyUsers = false;

    @action refreshNearbyUsers() {
        if (!this.isFetchingNearbyUsers) {
            return new Promise((resolve, reject) => {
                this.isFetchingNearbyUsers = true;

                Api.getNearbyUsers().then(res => {
                    this.nearbyUsers = res;
                    this.isFetchingNearbyUsers = false;
                    resolve();
                });
            })
        }

        return false;
    }

    @action fetchMoreNearbyUsers() {
        if (!this.isFetchingNearbyUsers && !this.hasLoadedAllNearbyUsers) {
            this.isFetchingNearbyUsers = true;

            const nextPage = this.nearbyUsersCurrentPage + 1

            Api.getNearbyUsers(nextPage).then(res => {
                // If no more users found, avoid fetching
                if (res == undefined) {
                    this.hasLoadedAllNearbyUsers = true;
                    return true;
                }

                this.nearbyUsers = this.nearbyUsers.concat(res);
                this.nearbyUsersCurrentPage = nextPage;
                this.isFetchingNearbyUsers = false;
                return true;
            });
        }

        return false;
    }
}

const usersStore = new UsersStore();
export default usersStore;
