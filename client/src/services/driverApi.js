import { axiosApi } from "../constants/axios";

export const driverSignup = async(driverData)=>{
    try {
        const response = await axiosApi.post("driver/driverSignup",driverData)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

export const driverLogin = async(driver)=>{
    try {
        const response = await axiosApi.post("driver/driverLogin",driver)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}