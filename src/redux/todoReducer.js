import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');''
    console.log(response);
    
    return response.json();
})


const todosSlice = createSlice({
    name: 'todos',
    initialState : {
        todos: [], 
        status : 'idle',
        error : null
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        editTodo : (state , action) =>{
            const existingTodo = state.todos.find(el => el.id === action.payload.id)
            if (existingTodo) {
                existingTodo.title  = action.payload.title 
            }
        }
    },
   extraReducers : (builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'success';

            state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state) => {
            state.status = 'failed';
        })
        
   }
});

export const { addTodo, removeTodo, toggleTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;