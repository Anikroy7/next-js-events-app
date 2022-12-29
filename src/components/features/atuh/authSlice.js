import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../../../firebase/firebase.config";




const initialState = {
    email: '',
    isLoading: false,
    isError: false,
    error: ''
}

export const loginUserWithGoogle = createAsyncThunk("auth/loginUserWithGoogle", async () => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    return data;

})

export const createUser = createAsyncThunk("auth/creteUser", async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
})

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
})


const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.email = payload;
        },
        logoutUser: (state) => {
            state.email = "";
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserWithGoogle.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = '';
                state.isError = false

            })
            .addCase(loginUserWithGoogle.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = '';
                state.isError = false;
                state.email = payload.user.email;

            })
            .addCase(loginUserWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = '';
                state.isError = false

            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = '';
                state.isError = false;
                state.email = payload.user.email;

            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = '';
                state.isError = false

            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = '';
                state.isError = false;
                state.email = payload.user.email;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.error = action.error.message;
            })
    }

})

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;