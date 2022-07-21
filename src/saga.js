import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_API, SET_API_DATA } from './actions/types';

function* getApiData(action) {

    let data = yield fetch('https://windy-simplistic-blender.glitch.me/todolist');
    data = yield data.json();
    yield put({ type: SET_API_DATA, data: data });
}

function* saga() {
    yield takeEvery(FETCH_API, getApiData)
}

export default saga;