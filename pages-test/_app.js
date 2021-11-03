import App, { Container } from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../component/Layout';

class MyApp extends App {
  // Componentd对应的就是render中的component;
  static async getInitialProps ({ Component, ctx }) {
    // 每次页面切换这个方法都会执行；
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
    }
  }
  render() {
    // component对应的就是每个页面;
    const { Component, pageProps } = this.props;
    console.log(Component, '1')
    return (
      <Container>
        <Layout>
          <span>over</span>
        </Layout>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp;