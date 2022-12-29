import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/atuh/authSlice';
import counterSlice from '../features/couter/counterSlice';


const store = configureStore({
    reducer: {
        counter: counterSlice,
        authentication: authSlice,
    }
})

export default store;