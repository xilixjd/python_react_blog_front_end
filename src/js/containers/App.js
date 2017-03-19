import React, {Component} from 'react'
import {connect} from 'react-redux'
import NProgress from 'nprogress'
import {CONFIG} from '../constants/Config.js'
import {Link, hashHistory} from 'react-router'
import NavTag from '../components/NavTag.js'
import LoginingView from '../components/loginingView.js'
import LogRegModal from '../components/logRegModal.js'

import {Layout, Menu, Breadcrumb } from 'antd'
const {Header, Content, Footer} = Layout
// const tags = (
//     <Menu>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
//         </Menu.Item>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
//         </Menu.Item>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
//         </Menu.Item>
//     </Menu>
// )


class App extends Component {
    constructor(props) {
        super(props);
        // this.addBaiduAnaly = this.addBaiduAnaly.bind(this);
        // this.addDuoshuoComment = this.addDuoshuoComment.bind(this);
    }

    componentDidMount() {
        // 添加百度统计
        // this.addBaiduAnaly();

        // 添加多说评论框
        // this.addDuoshuoComment();

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

    addBaiduAnaly() {
        if (document.domain.indexOf('github.io') > -1) {
            var _hmt = _hmt || [];
            (function () {
                var hm = document.createElement('script');
                hm.src = '//hm.baidu.com/hm.js?' + CONFIG['baiduAnaly'];
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
    }

    addDuoshuoComment() {
        window.duoshuoQuery = {short_name: CONFIG.duoshuo};
        (function () {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
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
                    <Header>
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
                            <Menu.Item key="7"></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <Breadcrumb style={{margin: '12px 0'}}>
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
                        <div style={{
                            background: '#fff',
                            padding: 24,
                            minHeight: 600,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div>
                                {this.props.children}
                            </div>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design @xilixjd Created by Ant UED
                    </Footer>
                </Layout>
                <LoginingView/>
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