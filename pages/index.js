import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import Comp from '../component/Layout.jsx';

const AsyncComp = dynamic(import('../component/Layout')); // 此时是异步组件；
// function gotoTestB() {
//   Router.push('/a');
// }

// 路由映射，第二个参数;有一个问题就是刷新会404，服务端没有这个路径渲染；所以需要koa解决这个问题

const events = [
  'routerChangeStart','routerChangeComplete','routerChangeError', 'beforeHistoryChange','hashChangeStart','hashChangeComplete',
];

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args);
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

function gotoTestB() {
  Router.push({
    pathname: '/a',
    query: {
      id: 1
    }
  }, '/a/1');
}

export default () => (
  <div>
    <Comp />
    <Link href="/a?id=2" as="/a/2"> 
      <Button>a</Button>
    </Link>
    <Button onClick={gotoTestB}>test b</Button>
  </div>
)