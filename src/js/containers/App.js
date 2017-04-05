import React, {Component} from 'react'
import {connect} from 'react-redux'
import NProgress from 'nprogress'
import {CONFIG} from '../constants/Config.js'
import {Link, hashHistory} from 'react-router'
import NavTag from '../components/NavTag.js'
import LoginingView from '../components/loginingView.js'
import LogRegModal from '../components/logRegModal.js'
import { DOMAIN } from '../constants/ActionTypes.js'

import io from 'socket.io-client'

import {Layout, Menu, Breadcrumb } from 'antd'
const {Header, Content, Footer} = Layout

import '../../css/antd.scss'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: io.connect(DOMAIN)
        }
    }

    componentDidMount() {
        document.title = CONFIG.title;

        if (!this.props.isFetching) {
            NProgress.done();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFetching) {
            document.title = CONFIG.title;
            NProgress.done();
        }
    }

    render() {
        let hashPath = window.location.hash
        let path = hashPath.substr(1)

        let pathArray = path.split('/')
        if (path === '/') {
            pathArray = ['']
        }
        return (
            <div id="root">
                <Layout className="layout">
                    <Header className="layout-header">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="all">全部</Link></Menu.Item>
                            {/*<Menu.Item key="4"><Link to="archive">归档</Link></Menu.Item>*/}
                            {/*<Menu.Item key="5"><Link to="tags">标签</Link></Menu.Item>*/}
                            <NavTag/>
                            {/*<Menu.Item key="6"><Link to="antd">Antd</Link></Menu.Item>*/}
                            <Menu.Item key="7"><Link to="todo">Todo</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="layout-content">
                        <Breadcrumb className="layout-breadcrumb">
                            {
                                pathArray.map((item, index) => {
                                        if (item === '') {
                                            item = 'index'
                                        }
                                        return (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                                    }
                                )
                            }
                        </Breadcrumb>
                        <div className="layout-children">
                            <div style={{width: '100%'}}>
                                {this.props.children}
                            </div>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design @xilixjd Created by Ant UED
                    </Footer>
                </Layout>
                <LoginingView socket={this.state.socket}/>
                <LogRegModal/>
            </div>
        );
    }
}
;

function mapStateToProps(state) {
    const {postIssues} = state
    const {
        isFetching,
        items
    } = postIssues || {
        isFetching: true,
        items: []
    }

    return {
        isFetching,
        items
    }
}

export default connect(mapStateToProps)(App);