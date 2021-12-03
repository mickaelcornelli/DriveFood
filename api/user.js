import axios from 'axios';
import {config} from '../config';

export const registerUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/save", data)
             .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const setDefaultNotification = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/defaultnotification", data)
             .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const loginUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/login", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const userPersonnalInformations = (id,token)=>{

    return axios.get(config.api_url+"/api/v1/user/account/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const updateUser = (id,data,token)=>{
    return axios.put(config.api_url+"/api/v1/user/update/"+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const userCommunicationPreferences = (id,token)=>{
    return axios.get(config.api_url+"/api/v1/user/account/communicationpreferences/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const editCommunicationPreferences = (id,data,token)=>{
    return axios.put(config.api_url+"/api/v1/user/account/update/communicationpreferences/"+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}