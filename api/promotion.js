import axios from 'axios';
import {config} from '../config';


export const getAllPromotion = (token)=>{
    console.log("TOKEN API PROMO",token)
    return axios.get(config.api_url+"/api/v1/promotion/all", {headers: {'x-access-token': token}})
            .then((res)=>{
                //console.log("RES API PROMO",res)
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
} 

