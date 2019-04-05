import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgerbuilder-20481.firebaseio.com/'
});

export default instance;