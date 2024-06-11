import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
  timeout: 20000,
})

export default axios