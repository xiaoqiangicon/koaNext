import Link from 'next/link';
import { Button } from 'antd';

export default ({children}) => (
  <>
    <header>
      lazy comp
    </header>
    <div>{children}</div>
  </>
)