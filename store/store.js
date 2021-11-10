import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// 为什么需要redux-thunk，因为有时候需要发送异步的dispatch，
// 但是现有机制无法处理；
// 为什么需要recat-redux；因为需要把组件和store链接起来；

import { composeWithDevTools } from 'redux-devtools-extension';

// 不同数据可能有不同的state;
const initialState = {
  count: 0,
  day: 1,
}

const userInitialState = {
  username: 'lee'
}

const ADD = 'ADD';

// 因为case可能太多，所以需要对reducer进行拆分；一般来说拆分reducers和actions
// action一般使用函数,action creator创建一个action
function add(num) {
  return {
    type: ADD,
    num,
  }
}

// 只是帮我们把dispacth传递过去而已,getState就是store.getState
function addAsync(num) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 3000)
  }
}

// action需要传入一个对象；
function counter(state = initialState, action) {
  switch(action.type) {
    // 每次都返回一个新的对象；
    case ADD:
      return { ...initialState, count: state.count + (action.num || 1)}
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME';
function user(state=userInitialState, action) {
  switch(action.type) {
    case UPDATE_USERNAME:
      return { ...state, username: action.name }
    default:
      return state
  }
}

const allReducers = combineReducers({
  counter,
  user,
})

const store = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)));

// 定义之前更新state不会触发
store.subscribe(() => {
  console.log(store.getState(), '更新了')
})
store.dispatch(add(3));
store.dispatch(addAsync(5));
store.dispatch({type: UPDATE_USERNAME, name: 'haha'})

export default store;

// export default function initializeStore() {
//   const store = createStore(
//     allReducers, 
//     {}, 
//     composeWithDevTools(applyMiddleware(reduxThunk))
//   );

//   return store;
// }