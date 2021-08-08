
import axios from 'axios';
const instance = axios.create({
    baseURL:"http://chamran.daan.ir:3000/"
});

export default instance;