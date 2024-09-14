import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

// Define the async thunk for signup
export const signup = createAsyncThunk(
  'user/signup',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/signup`, data);
      return response;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);

export const signin=createAsyncThunk(
  'user/signin',
  async (data:any,{rejectWithValue})=>{
    try {
      const response=await axios.post(`${baseUrl}/login`,data);
      return response;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }

);

// Define initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
  response: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload;
        if(action.payload.data.status==200){
            toast.success(action.payload.data.msg);
        }else if(action.payload.data.status==401){
            toast.error(action.payload.data.msg,{
                style:{
                    background:"#FDD94E"
                }
            });
        }else{
            toast.error("Something went wrong!");
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.response = null;
        toast.error(action.payload as string);
      })

      // signin cases
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload;
        if (action.payload.data.status === 200) {
          toast.success(action.payload.data.msg);
        } else if (action.payload?.data.status === 400) {
          toast.error(action.payload.data?.msg, {
            style: {
              background: "#FDD94E",
            },
          });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.response = null;
        toast.error(action.payload as string);
      });
  },
});

export default userSlice.reducer;
