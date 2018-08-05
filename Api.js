var axios = require('axios');

BASE_URL = 'http://192.168.1.128:3000';

// TODO: Set JWT token on login
axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUzMzQ4MzU4Nn0.XF5HZwTgLze1EF8JuAHLml1tROq86qCXOv4Oc9qyw10';

export default class Api {
    static getNearbyUsers() {
        const route = '/users/nearby'
        const endPoint = BASE_URL + route;

        return axios.get(endPoint).then(res => {
            return res.data.data.users;
        }).catch(e => {
            throw e;
        });
    }
}
