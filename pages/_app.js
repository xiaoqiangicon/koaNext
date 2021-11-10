import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import Layout from '../component/Layout';
import store from '../store/store';
import testHoc from '../libs/with-redux';

class MyApp extends App {
  // Componentd对应的就是render中的component;
  static async getInitialProps (ctx) {
    const { Component } = ctx;
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
    return (
      <Container>
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    )
  }
}

export default MyApp;