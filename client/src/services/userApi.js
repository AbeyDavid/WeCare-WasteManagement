import { axiosApi } from "../constants/axios";

export const continueWithGoogle = async(userData) =>{
    const response = await axiosApi.post("user/googleAuth",userData)
    return response.data
}

