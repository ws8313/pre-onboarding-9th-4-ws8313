import { Layout, Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

const { Header, Sider, Content } = Layout;

export function MainLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width='15rem'
        style={{
          background: '#fff',
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <img
          src={collapsed ? '/logo-small.png' : '/logo.png'}
          alt='logo'
          style={{
            height: 32,
            margin: 16,
          }}
        />
        <Menu theme='light' defaultSelectedKeys={['/']}>
          <MenuItem key='/' icon={<ShoppingCartOutlined />}>
            주문 목록
          </MenuItem>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 0,
            background: '#fff',
          }}
        />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
