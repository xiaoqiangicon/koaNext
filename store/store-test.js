import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

const initialState = {
  name: 'lee',
}

function addCreator(name) {
  return {
    type: UPDATE,
    name,
  }
}

function addAsync(name) {
  return (dispatch, getState) => {
    setTimeout(function () {
      dispatch(addCreator('john'))
    }, 5000)
  }
}

const ADD = 'ADD';
const UPDATE = 'UPDATE';

function userReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE:
      return { ...initialState, name: action.name }
    default:
      return state
  }
}

const counterInitialState = {
  counter: 9,
}

function counterReducer(state = counterInitialState, action) {
  switch(action.type) {
    case ADD:
      return { ...counterInitialState, counter: action.num }
    default:
      return state
  }
}

const allReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
})


const store = createStore(allReducer, {}, applyMiddleware(reduxThunk));

store.subscribe(() => {
  console.log(store.getState(), 'change')
});

store.dispatch({ type: ADD, num: 100 });
store.dispatch(addAsync())

export default store;