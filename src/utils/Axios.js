import axios from 'axios'

const url='http://localhost:4000'
const Instance=axios.create({
    baseURL:url,
    withCredentials:true
})

export default Instance