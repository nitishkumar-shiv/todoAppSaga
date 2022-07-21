import { ADD_TODO, CHECK_TODO, DELETE_TODO, EDIT_TODO, FETCH_API, SET_API_DATA } from "../actions/types";

const initialState = {
    todolist: []
}

const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todolist: [
                    ...state.todolist,
                    {

                        id: action.id,
                        name: action.data,
                        isChecked: false
                    }
                ]
            }
        case DELETE_TODO:
            return {
                ...state,
                todolist: state.todolist.filter(item => item.id !== action.id)
            }
        case EDIT_TODO:
            return {
                ...state,
                todolist: state.todolist.map((item) => {
                    if (item.id == action.eid) {
                        return { ...item, name: action.data };
                    }
                    else {
                        return item;
                    }
                })
            }
        case CHECK_TODO:
            return {
                ...state,
                todolist: state.todolist.map((item) => {
                    if (item.id == action.id) {
                        return { ...item, isChecked: true };
                    }
                    else {
                        return item;
                    }
                })
            }
        case SET_API_DATA:
            return {
                ...state,
                todolist: action.data
            }

        default:
            return state;
    }
}
export default todoReducer;