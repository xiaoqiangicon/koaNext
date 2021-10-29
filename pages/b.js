import React, { useEffect, useReducer, useLayoutEffect, useState, } from 'react';

class MyCount extends React.Component {
  state = {
    count: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return <span>{this.state.count}</span>
  }
}

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
        return state + 1
    case 'minus': 
        return state - 1
    default:
        return state;
  }
}

function MyCountFunc() {
  // useState一般用来定义基本数据，useReducer一般用来定义对象;
  const [count, setCount] = useState(0);
  const [number, dispatchNumber] = useReducer(countReducer, 0);
  const [name, setName] = useState('lee');


  // useEffect(() => {
  //   const interval = setInterval(() => {

  //     // 第一种用法，直接传入一个值，直接变成这个值
  //     // 传入一个回调函数；使用最新的值进行操作
  //     // 如果不传入回调函数;则count不是最新的值，闭包造成的;
  //     dispatchNumber({type: 'add'})
  //     setCount(c => c + 1)
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [])


  // 组件第一次渲染的时候就执行了这个effect;
  // 第二个参数不传；组件每次更新都会先执行return；然后再重新执行useEffect;
  // 第二个参数传[],只会在第一次渲染中执行；
  // 传入的数组不为空，则数组中的内容变化了就会重新执行useEffect;
  // 会在dom更新后执行；
  useEffect(() => {
    console.log('effect invoke');
    return () => console.log('effect detact');
  })

  // 永远比useEffect先执行；会在Dom更新前执行，执行完毕后才渲染；一般不使用；
  useLayoutEffect(() => {
    console.log('layouteffect invoke');
    return () => console.log('layouteffect detact');
  }, [count])

  // 组件被卸载的时候执行;
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => {dispatchNumber({type: 'add'})}}>button</button>
      <span>{count} : {number}</span>
    </div>
  )
}

export default MyCountFunc;