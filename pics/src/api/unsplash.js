
import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID mB5YBxeQby3lrsIOE1aOKmuoYkGMRsXrv_76bI7Ze0U'
    }
})