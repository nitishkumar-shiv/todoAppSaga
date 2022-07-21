import { ADD_TODO, DELETE_TODO, EDIT_TODO, CHECK_TODO, FETCH_API } from './types';

export const addTodo = (data) => {
    return {
        type: ADD_TODO,
        id: new Date().getTime().toString(),
        data: data
    };
}
export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id: id
    }
}

export const editTodo = (eid, text) => {
    return {
        type: EDIT_TODO,
        eid: eid,
        data: text
    }
}

export const checkTodo = (id) => {
    return {
        type: CHECK_TODO,
        id: id
    }
}

export const fetchData = () => {
    return {
        type: FETCH_API,
    }
}