import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const store = configureStore({
    reducer: {
        todoList: rootReducer,
    }
});

export default store;