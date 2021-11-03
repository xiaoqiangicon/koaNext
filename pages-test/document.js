import Document, { Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components';
 
function withLog(Comp) {
  return (props) => {
    console.log(props);
    return <Comp {...props} />
  }
}

class MyDocument extends Document {

  // static async getInitialProps(ctx) {
  //   const sheet = new ServerStyleSheet();
  //   const originalRenderPage = ctx.renderPage

  //   try {
  //     ctx.renderPage = () => originalRenderPage({
  //       // APP就是全局的app
  //       enhanceApp: App => props => sheet.collectStyles(<App {...props} />) 
  //       // component就是page下面定义的每一个文件
  //       // enhanceComponent: Component => withLog(Component),
  //     })

  //     const props = await Document.getInitialProps(ctx)

  //     return {
  //       ...props,
  //       styles: (<>{props.styles}{sheet.getStyleElement()}</>)
  //     }
  //   } finally {
  //     sheet.seal();
  //   }
    
  // }
  
  render() {
    return(
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;