import React, {Component} from 'react'
import {connect} from 'react-redux'
import NProgress from 'nprogress'
import {CONFIG} from '../constants/Config.js'
import {Link, hashHistory} from 'react-router'

import NavTag from '../components/NavTag.js'
import LoginingView from '../components/loginingView.js'
import LogRegModal from '../components/logRegModal.js'
import SearchBar from '../components/SearchBar.js'
import Notificate from '../components/Notificate.js'

import { DOMAIN } from '../constants/ActionTypes.js'

import io from 'socket.io-client'

import {Layout, Menu, Breadcrumb, Tooltip } from 'antd'
const {Header, Content, Footer} = Layout

import '../../css/antd.scss'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: io.connect(DOMAIN),
            modalVisible: false,
            confirmLoading: false,
        }
    }

    componentDidMount() {
        document.title = CONFIG.title
        if (!this.props.isFetching) {
            NProgress.done()
        }
        var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?2c57dc2aa86010c3428a43ee24e48d32";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFetching) {
            document.title = CONFIG.title;
            NProgress.done()
        }
    }

    onSearchBarChange = (newStateDict) => {
        let { visible, confirmLoading } = newStateDict
        this.setState({
            modalVisible: visible,
            confirmLoading: confirmLoading,
        })
    }

    showSearchModal = () => {
        this.setState({
            modalVisible: true,
        })
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
                            <NavTag/>
                            {/*<Menu.Item key="6"><Link to="antd">Antd</Link></Menu.Item>*/}
                            <Menu.Item key="7"><Link to="todo">Todo</Link></Menu.Item>
                            <Menu.Item key="8"><Link to="motion">Motion</Link></Menu.Item>
                            <Menu.Item key="9">
                                <Tooltip placement="bottom" title="此功能在远程服务器上开启celery后无法使用并导致服务器崩溃">
                                    <a onClick={this.showSearchModal}>Search</a>
                                </Tooltip>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="layout-content">
                        <Breadcrumb className="layout-breadcrumb">
                            {
                                pathArray.map((item, index) => {
                                        if (item === '') {
                                            item = 'index'
                                        }
                                        let queryIndex = item.indexOf('?')
                                        if (queryIndex !== -1) {
                                            item = item.substring(0, queryIndex)
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
                <LoginingView socket={this.state.socket}
                                loginingViewLocation={this.props.location}/>
                <LogRegModal/>
                <SearchBar visible={this.state.modalVisible} 
                            callbackParent={this.onSearchBarChange}
                            searchBarLocation={this.props.location}
                            confirmLoading={this.state.confirmLoading}
                />
                <Notificate/>
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

export default connect(mapStateToProps)(App)