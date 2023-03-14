import { axiosApi } from "../constants/axios";

export const adminLogin = async (adminData) => {
    try {
        const response = await axiosApi.post("admin/adminLogin", adminData);
        return response.data;
    } catch (error) {
        console.log(error.messa);
    }
};

export const userDetails = async () => {
    try {
        const response = await axiosApi.get("admin/userDetails");
        return response.data
    } catch (error) {
        console.log(error.message);
    }
};

export const userStatusControl = async (userId)=>{
    try {   
        const response = await axiosApi.patch("admin/userStatusControl",userId)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export const addService = async (serviceData) =>{
    try {
        const response = await axiosApi.post("admin/addService",serviceData)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}   

export const getServices = async ()=>{
    try {
        const response = await axiosApi.get("admin/getService")
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteService = async (serviceId)=>{
    try {
        const response = await axiosApi.post("admin/deleteService",serviceId)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export const getDrivers = async()=>{
    try {   
        const response = await axiosApi.get("admin/getDrivers")
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export const getPendingDrivers = async()=>{
    try {   
        const response = await axiosApi.get("admin/getPendingDrivers")
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export const approveDriver = async(driverId)=>{
    try {
        const response = await axiosApi.post("admin/approveDriver",driverId)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

export const rejectDriver = async(driverId)=>{
    try {
        const response = await axiosApi.post("admin/rejectDriver",driverId)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}