import axios from 'axios';

const KEY = 'AIzaSyD9rV1816wI0EYeMq_Y_XhTcYYR_LxM2sA'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
});

