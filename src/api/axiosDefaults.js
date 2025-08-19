import axios from "axios";


axios.defaults.baseURL = 'https://drf-api-rect-2ba84034ad74.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true