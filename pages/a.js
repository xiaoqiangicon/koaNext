import Link from 'next/link';
import { withRouter } from 'next/router';
import { Button } from 'antd';

const A = ({ router, name }) => (
  <div>fjdks{router.query.id}: {name}</div>
)

A.getInitialProps = async () => {
  const promise = new Promise(() => {
    setTimeout(() => {}, 1000);
  })
  return {
    name: 'lee'
  }
}

export default withRouter(A);