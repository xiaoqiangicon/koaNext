import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Button, Layout, Icon, Input, Avatar } from 'antd';
import Container from './Container.jsx';

const { Header, Content, Footer } = Layout;

const Comp = ({ color, children, style }) => <div style={{color, ...style}}>{children}</div>

export default ({children}) => {

  const [search, setSearch] = useState('');
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, [])
  const handleOnSearch = useCallback(() => {}, [])

  const githubIconStyle = {
    color: 'white',
    fontSize: 40,
    display: 'block',
    paddingTop: 10,
    marginRight: 20,
  }

  const footerStyle = {
    textAlign: 'center',
  }

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle}/>
            </div>
            <div>
              <Input.Search value={search} onChange={handleSearchChange} onSearch={handleOnSearch} placeholder="搜索仓库" />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<Comp />}>
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>develop by lee</Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  )
}