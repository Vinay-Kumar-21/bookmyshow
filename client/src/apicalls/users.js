import { axiosInstance } from ".";


//register
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/register', payload);
        return response.data;
    }
    catch (err) {
        return err;
    }
}

//login