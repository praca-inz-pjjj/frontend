import axios from "axios";
import {BACKEND_ADDRESS} from "../constances";
let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
     refresh = true;
     console.log(localStorage.getItem('refresh_token'))
     const response = await   
           axios.post(BACKEND_ADDRESS + '/teacher/token/refresh', {
                      refresh:localStorage.getItem('refresh_token')
                      }, { headers: 
                      {'Content-Type': 'application/json' }
                      },{withCredentials: true});
    if (response.status === 200) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
       console.log(response.data);
       localStorage.setItem('access_token', response.data.access);
       localStorage.setItem('refresh_token', response.data.refresh);
       return axios(error.config);
    }
  }
    refresh = false;
    return error;
});