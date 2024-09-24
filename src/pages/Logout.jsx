import {useEffect} from "react"
import axios from "axios";
import {BACKEND_ADDRESS} from "../constances";
import {useNavigate} from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
       (async () => {
         try {
          console.log('logout')
           await axios.post(BACKEND_ADDRESS+'/logout',{
                 refresh_token:localStorage.getItem('refresh_token')
                 } ,{headers: {'Content-Type': 'application/json'}},  
                 {withCredentials: true});
            console.log('logout success')
           localStorage.clear();
           axios.defaults.headers.common['Authorization'] = null;
           navigate('/login')
           } catch (e) {
             console.log('logout not working', e)
           }
         })();
    }, [navigate]);
    return (
       <div>Logging out...</div>
     )
}