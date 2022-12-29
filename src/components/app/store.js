import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/couter/counterSlice';


const store = configureStore({
    reducer: {
        counter: counterSlice
    }
})

export default store;