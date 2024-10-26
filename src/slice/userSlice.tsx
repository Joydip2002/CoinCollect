import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

// Interface representing the overall state for user authentication
interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
  response: ApiResponse | null;
}

// Interface for the expected data structure for signup
interface SignupData {
  email: string;
  password: string;
  // Add other fields as needed
}

// Interface for the expected data structure for signin
interface SigninData {
  email: string;
  password: string;
  // Add other fields as needed
}

// Interface representing the structure of the API response
interface ApiResponse {
  status: number;
  msg: string; // You can uncomment this if the response has a msg field
  // Add other fields as needed
}

// Define the async thunk for signup
export const signup = createAsyncThunk(
  'user/signup',
  async (data: SignupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/signup`, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);

// Define the async thunk for signin
export const signin = createAsyncThunk(
  'user/signin',
  async (data: SigninData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);

// Define the initial state for the user slice
const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  response: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload.data; // Adjusted to assign just the data
        if (action.payload.data.status === 200) {
          toast.success(action.payload.data.msg);
        } else if (action.payload.data.status === 401) {
          toast.error(action.payload.data.msg, {
            style: {
              background: "#FDD94E",
            },
          });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Cast to string for type safety
        state.response = null;
        toast.error(action.payload as string);
      })

      // Signin cases
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload.data; // Adjusted to assign just the data
        if (action.payload.data.status === 200) {
          toast.success(action.payload.data.msg);
        } else if (action.payload.data.status === 400) {
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
        state.error = action.payload as string; // Cast to string for type safety
        state.response = null;
        toast.error(action.payload as string);
      });
  },
});

// Export the reducer as default
export default userSlice.reducer;
