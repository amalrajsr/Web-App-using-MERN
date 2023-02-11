
import axios from'axios'
import { BASEURL } from './Constants/constant'

const instance= axios.create({
    baseURL:BASEURL
})

export default instance