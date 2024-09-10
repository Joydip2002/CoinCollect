import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const baseUrl: string = import.meta.env.VITE_API_BASE_URL;


const initialState={

}

export const userSlice = createSlice({
    name : 'user',
    initialState,

    reducers : {
        signup:async(state,action)=>{
            // console.log("state=>",state);
            // console.log("action=>",action.payload);
            try{
                const signupData= await axios.post(`${baseUrl}/signup`,action.payload);
                // console.log(signupData);
                if(signupData.data.status==200){
                    toast(signupData.data.msg);
                }
                
            }catch(error) {
                
            }
        }
    }
})

export const {signup} = userSlice.actions;
export default userSlice.reducer;