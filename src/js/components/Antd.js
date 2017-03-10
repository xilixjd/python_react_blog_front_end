/**
 * Created by xilixjd on 17/3/4.
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

// 通知提示
// const openNotificationWithIcon = (type) => {
//     notification[type]({
//         message: 'Notification Title',
//         description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
//     });
// };
//
// ReactDOM.render(
//     <div>
//         <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
//         <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
//         <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
//         <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
//     </div>
//     , mountNode);


export default class Antd extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}
