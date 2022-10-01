import axios from "axios";


const API_URL = '/user/signup'

const register = async(data)=>{
    const response = await axios.post(API_URL,data)
    console.log(response);

    if(response.data){
        localStorage.setItem('userInfo',JSON.stringify(response.data))
    }
    return response.data
}

const authServices ={
    register
}

export default authServices