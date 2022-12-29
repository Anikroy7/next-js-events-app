import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}


const couterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {}
})

export default couterSlice.reducer;