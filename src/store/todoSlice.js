import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.type)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((_, index) => index != action.payload);
        },
        editTask: (state, action) => {
            const {index, updateTask} = action.payload;
            if(state.tasks[index]){
                state.tasks[index] = updateTask;
            }
        },
    },
})
export const {addTask, deleteTask, editTask} = todoSlice.actions;
export default todoSlice.reducer;