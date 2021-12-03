import axios from 'axios';
import {config} from '../config';

export const saveOrder = (data,token)=>{
    return axios.post(config.api_url+"/api/v1/order/save",data, { headers: { 'x-access-token': token }})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const payment = (data,token)=>{
    
    return axios.post(config.api_url+"/api/v1/order/payment",data, { headers: { 'x-access-token': token }})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getAllOrder = (id,token)=>{
    
    return axios.get(config.api_url+"/api/v1/order/all/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getLastOrder = (id,token)=>{
    
    return axios.get(config.api_url+"/api/v1/order/last/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getOneOrder = (id,token)=>{
    
    return axios.get(config.api_url+"/api/v1/order/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getOrderDetail = (id,token)=>{
    
    return axios.get(config.api_url+"/api/v1/order/orderdetail/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const updateStatus = (data,token)=>{
    return axios.put(config.api_url+"/api/v1/order/validate", data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}