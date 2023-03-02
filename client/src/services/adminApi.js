import { axiosApi } from "../constants/axios";

export const adminLogin = async (adminData) =>{
    const response = await axiosApi.post("admin/adminLogin",adminData)
    return response.data
}


