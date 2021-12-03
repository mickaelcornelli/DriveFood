import axios from 'axios';
import {config} from '../config';


export const getOneProduct = (id, token)=>{
    return axios.get(config.api_url+"/api/v1/product/"+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
} 

export const getAllProduct = (token)=>{
    return axios.get(config.api_url+"/api/v1/all/product", {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
} 

export const getSectionProducts = (id,token)=>{
    return axios.get(config.api_url+"/api/v1/product/section/"+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
} 



export const searchProduct = (data,token)=>{
    
    return axios.post(config.api_url+'/api/v1/product/search', data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}