const axios = require('axios');

const domaine = process.env.DOMAINE;
const instance = axios.create({
    baseURL: `${domaine}/api/`,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;