import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { BaseUrl } from "../../BaseUrl";
import { decryptFuc } from "../../utils/decrpt";

// Function to retrieve token from localStorage
const getToken = () => localStorage.getItem("Taxsure");

// API headers including token
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export const signUp = createAsyncThunk("sign-up", async (userDetails) => {
    try {
        const response = await BaseUrl.post(`auth/sign-up`, userDetails);
        // console.log("response.data", response.data)
        // let responseData = await decryptFuc(response?.data)
        return response?.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Sign Up",
            text: `${error.response.data.message}`,
        });
        throw error;
    }
})
export const emailValidation = createAsyncThunk("sign-in", async (userDetails) => {
    try {
        const response = await BaseUrl.post(`auth/email-validation`, userDetails);
        // console.log("response.data", response.data)
        let responseData = await response?.data;
        return responseData;
    } catch (error) {
        console.log("error==>", error)
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
        });
        throw error; // Ensure the error is propagated
    }
})
export const signIn = createAsyncThunk("sign-in", async (userDetails) => {
    try {
        const response = await BaseUrl.post(`auth/sign-in`, userDetails);
        // console.log("response.data", response.data)
        let responseData = await decryptFuc(response?.data?.data)
        return responseData;
    } catch (error) {
        console.log("error==>", error)
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
        });
        throw error; // Ensure the error is propagated
    }
})
export const updateUser = createAsyncThunk("update-in", async (userDetails) => {
    try {
        const response = await BaseUrl.patch(`user`, userDetails, getAuthHeaders());
        // console.log("response.data", response.data)
        // let responseData = await decryptFuc(response?.data)
        return response.data;
    } catch (error) {
        // Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: `${error.response.data.message}`,
        // });
        throw error; // Ensure the error is propagated
    }
})
export const getAllUsers = createAsyncThunk("users-data", async () => {
    try {
        console.log("getAuthHeaders", getAuthHeaders())
        const response = await BaseUrl.get(`user`, getAuthHeaders());
        // console.log("response.data", response.data)
        let responseData = await decryptFuc(response?.data?.data)
        return responseData;
    } catch (error) {
        throw error
    }
})
export const getAllRoles = createAsyncThunk("role-data", async () => {
    try {
        console.log("getAuthHeaders", getAuthHeaders())
        const response = await BaseUrl.get(`role`, getAuthHeaders());
        // console.log("response.data", response.data)
        let responseData = await decryptFuc(response?.data?.data)
        return responseData;
    } catch (error) {
        throw error
    }
})

export const singleUser = createAsyncThunk("single-user", async (id) => {
    try {
        console.log("getAuthHeaders", getAuthHeaders())
        const response = await BaseUrl.get(`user/${id}`, getAuthHeaders());
        // console.log("response.data", response.data)
        let responseData = await decryptFuc(response?.data?.data)
        return responseData;
    } catch (error) {
        throw error
    }
})
export const getAllEmployeeList = createAsyncThunk("Employee-list", async () => {
    try {
        console.log("getAuthHeaders", getAuthHeaders())
        const response = await BaseUrl.get(`user/list`, getAuthHeaders());
        let responseData = await decryptFuc(response?.data?.data)
        console.log("response.data", responseData)
        return responseData;
    } catch (error) {
        throw error
    }
})
export const deleteUser = createAsyncThunk("delete-user", async (id) => {
    try {
        console.log("getAuthHeaders", getAuthHeaders())
        const response = await BaseUrl.delete(`user/${id}`, getAuthHeaders());
        // console.log("response.data", response.data)
        let responseData = await decryptFuc(response?.data?.data)
        return responseData;
    } catch (error) {
        throw error
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        usersData: [],
        usersListData: [],
        roleData: [],
        signinData: {},
        singleUser: {},
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false
                state.signinData = action.payload
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.usersData = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        builder
            .addCase(singleUser.pending, (state) => {
                state.loading = true
            })
            .addCase(singleUser.fulfilled, (state, action) => {
                state.loading = false
                state.singleUser = action.payload
            })
            .addCase(singleUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        builder
            .addCase(getAllRoles.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.loading = false
                state.roleData = action.payload
            })
            .addCase(getAllRoles.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        builder
            .addCase(getAllEmployeeList.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllEmployeeList.fulfilled, (state, action) => {
                state.loading = false
                state.usersListData = action.payload
            })
            .addCase(getAllEmployeeList.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer;


export const signInDetails = (state) => state.user.signinData;
export const userDropDownList = (state) => state.user.usersListData;
export const singleUserDetails = (state) => state.user.singleUser;
export const userList = (state) => state.user.usersData;
export const roleList = (state) => state.user.roleData;
export const userError = (state) => state.user.error;
export const userLoading = (state) => state.user.loading;