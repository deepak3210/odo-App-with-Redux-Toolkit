import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((_, index) => index != action.payload);
        },
        editTask: (state, action) => {
            const {index, updatedTask} = action.payload;
            if(state.tasks[index]){
                state.tasks[index] = updatedTask;
            }
        },
    },
})
export const {addTask, deleteTask, editTask} = todoSlice.actions;
export default todoSlice.reducer;