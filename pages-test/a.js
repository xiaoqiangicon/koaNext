import Link from 'next/link';
import { withRouter } from 'next/router';
import { Button } from 'antd';
import { resolveOnChange } from '_antd@3.26.20@antd/lib/input/Input';
// import moment from 'moment';

const color = '#113366';

const A = ({ router, name, time }) => (
  <>
    <div className="link">fjdks{router.query.id}: {name} : {time}</div>
    <style jsx>{`
      .link {
        color: blue;
      }
    `}</style>
    <style jsx global>{`
      div {
        color: pink;
      }
    `}</style>
  </>
)

A.getInitialProps = async (ctx) => {
  // 可以等到异步操作执行结束之后再去渲染内容，在客户端和服务端都是一样的；
  // 异步加载moment模块，且不会打包进最终代码;
  const moment = await import('moment');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'lee',
        time: moment.default(Date.now() - 60 * 1000).fromNow(),
      });
    }, 100);
  })

  return await promise;
}

export default withRouter(A);