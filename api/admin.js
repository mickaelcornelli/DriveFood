import axios from 'axios';
import {config} from '../config';

/********************************** USERS *********************************/

export const getAllUsers = (token)=>{
    return axios.get(config.api_url+"/api/v1/admin/user/all", {headers: {'x-access-token': token}})
             .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getOneUser = (id,token)=>{
    return axios.get(config.api_url+"/api/v1/user/"+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const saveOneUser = (data,token)=>{
    return axios.post(config.api_url+"/api/v1/admin/user/save",data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const updateUser = (id,data,token)=>{
    return axios.put(config.api_url+"/api/v1/admin/user/update/"+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const deleteUser = (id, token)=>{
    return axios.delete(config.api_url+'/api/v1/admin/user/delete/'+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

/********************* PRODUCTS ******************************/

export const getAllProducts = (token)=>{
    return axios.get(config.api_url+"/api/v1/admin/all/product", {headers: {'x-access-token': token}})
             .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const saveOneProduct = (data, token)=>{
    return axios.post(config.api_url+"/api/v1/admin/product/save", data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const updateProduct = (id, data, token)=>{
    return axios.put(config.api_url+"/api/v1/admin/product/update/"+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const deleteProduct = (id, token)=>{
    return axios.delete(config.api_url+'/api/v1/admin/product/delete/'+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}
   
/***************************** SECTIONS ****************************/

export const getAllSections = (token)=>{
    return axios.get(config.api_url+"/api/v1/admin/section/all", {headers: {'x-access-token': token}})
             .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const saveOneSection = (data, token)=>{
    return axios.post(config.api_url+"/api/v1/admin/section/save", data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const updateSection = (id, data, token)=>{
    return axios.put(config.api_url+"/api/v1/admin/section/update/"+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const deleteSection = (id, token)=>{
    console.log("id",id,"token",token)
    return axios.delete(config.api_url+'/api/v1/admin/section/delete/'+id, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}