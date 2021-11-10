import create from '_antd@3.26.20@antd/lib/icon/IconFont';
import createStore from '../store/store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialStore) {
  if (isServer) {
    return createStore(initialStore);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialStore)
  }
  return window[__NEXT_REDUX_STORE__];
}

import { Component } from 'react';

export default Comp => {
  class withReduxApp extends Component {
    constructor(props) {
      super(props);

      this.reduxStore = getOrCreateStore(props.initialReuxSate);
    }

    render() {
      let { Component, pageProps, ...rest } = this.props;
      console.log(Component, pageProps)

      if (pageProps) {
        // pageProps.test = 'test'
      }

      return <Comp Component={Component} pageProps={pageProps} reduxStore={this.reduxStore} {...rest} />
    }
  }

  withReduxApp.getInitialProps = async (ctx) => {
    let appProps = {};

    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx);
    }

    const reduxStore = getOrCreateStore()

    return {
      ...appProps,
    }
  }

  return withReduxApp;
}